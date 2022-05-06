const { createCanvas } = require("canvas");
import aws from "aws-sdk";

aws.config.update({
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETKEY,
    region: process.env.AWS_BUCKETREGION,
    signatureVersion: "v4",
});

const userData = {
    "Classical music": 10,
    "Alternative rock": 14,
    Pop: 2,
    Jazz: 12,
    Emo: 5,
};

const colors = [
    "#80b1d3",
    "#fb8072",
    "#b3de69",
    "#fdb462",
    "#fccde5",
    "#d9d9d9",
    "#bc80bd",
    "#8dd3c7",
    "#ffed6f",
];

function createImageID() {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const IdLength = 12;
    let imageID = "";
    for (let i = 0; i < IdLength; i++) {
        imageID += characters[Math.floor(Math.random() * characters.length)];
    }

    return imageID;
}

function drawSlice(
    context,
    centerX,
    centerY,
    radius,
    startAngle,
    endAngle,
    color
) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.closePath();
    context.fill();
}

function labelSlices(context, labels, sliceDetails) {
    const { grandTotal, pieChartData } = sliceDetails;
    labels.forEach((label, index) => {
        const { objectKey, positionX, positionY } = label;
        const percentage = Math.round(
            (100 * pieChartData[objectKey]) / grandTotal
        );
        context.fillStyle = "#000";
        context.font = "bold 36px Arial";
        context.fillText(`${percentage}%`, positionX - 20, positionY);
    });
}

function createSlices(context, sliceDetails) {
    const { pieDiameter, grandTotal, borderWidth, pieChartData } = sliceDetails;
    const radius = Math.min(pieDiameter / 2, pieDiameter / 2);
    const labels = [];
    const output = [];
    let startAngle = 0;

    Object.keys(pieChartData).forEach((key, index) => {
        const sliceAngle = (2 * Math.PI * pieChartData[key]) / grandTotal;
        const labelX =
            pieDiameter / 2 +
            borderWidth +
            (radius / 2) * Math.cos(startAngle + sliceAngle / 2);
        const labelY =
            pieDiameter / 2 +
            borderWidth +
            (radius / 2) * Math.sin(startAngle + sliceAngle / 2);

        drawSlice(
            context,
            pieDiameter / 2 + borderWidth,
            pieDiameter / 2 + borderWidth,
            radius,
            startAngle,
            startAngle + sliceAngle,
            colors[index]
        );
        labels.push({
            objectKey: key,
            positionX: labelX,
            positionY: labelY,
        });
        output.push({
            objectKey: key,
            color: colors[index],
        });
        startAngle += sliceAngle;
    });
    labelSlices(context, labels, sliceDetails);
    return output;
}

function createLegend(context, categories, legendDetails) {
    const { pieDiameter, borderWidth, pieLegendMargin } = legendDetails;
    const squareLength = 40;
    const squareMargin = 10;
    let currentY = borderWidth + pieDiameter + pieLegendMargin;
    categories.forEach((category) => {
        // Draw Square
        context.fillStyle = category.color;
        context.fillRect(borderWidth, currentY, squareLength, squareLength);

        // Add Text
        context.fillStyle = "#000000"; // Black
        context.font = "24px Arial";
        context.fillText(
            category.objectKey,
            borderWidth + squareLength + squareMargin,
            currentY + 28
        );

        // Move Y pointer
        currentY += squareLength + squareMargin;
    });
}

function createPieChart(pieChartData, res) {
    // Set Dimensions of Canvas
    const borderWidth = 64;
    const pieDiameter = 800;
    const pieLegendMargin = 20;
    const legendHeight = 50 * Object.keys(pieChartData).length;
    const canvasWidth = borderWidth * 2 + pieDiameter;
    const canvasHeight =
        borderWidth * 2 + pieDiameter + pieLegendMargin + legendHeight;

    const grandTotal = Object.values(pieChartData).reduce(
        (prev, curr) => prev + curr,
        0
    );

    const pieDetails = {
        pieDiameter,
        grandTotal,
        borderWidth,
        pieLegendMargin,
        pieChartData,
    };

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const context = canvas.getContext("2d");
    const categories = createSlices(context, pieDetails);
    createLegend(context, categories, pieDetails);
    const imageID = createImageID();
    const stream = canvas.createPNGStream();

    uploadPNG(stream, imageID, res);
}

function uploadPNG(pngStream, imageID, res) {
    const s3 = new aws.S3();
    const params = {
        Bucket: process.env.AWS_BUCKETNAME,
        Key: `${imageID}.png`,
        Body: pngStream,
        ContentType: "image/png",
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({ status: "error", url: null });
        } else {
            res.status(200).json({ status: "success", url: data.Location });
        }
    });
}

export default function handler(req, res) {
    const pieChartData = req.body || userData;
    try {
        createPieChart(pieChartData, res);
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: "error", url: null });
    }
}
