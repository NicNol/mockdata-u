const { createCanvas, registerFont } = require("canvas");
import aws from "aws-sdk";
import path from "path";

/* Provide path to font in public directory */
const basePath = process.cwd();
const publicDir = path.join(basePath, "public");

/* Register custom font with Canvas; Vercel does not provide any fonts in its deployment */
registerFont(`${publicDir}/fonts/NotoSansMono-VariableFont_wdth,wght.ttf`, {
    family: "NotoSansMono",
});

/* Set AWS configuration from environment variables */
aws.config.update({
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETKEY,
    region: process.env.AWS_BUCKETREGION,
    signatureVersion: "v4",
});

/* Default Pie Chart data if user does not include a JSON body*/
const userData = {
    "Classical music": 10,
    "Alternative rock": 14,
    Pop: 2,
    Jazz: 12,
    Emo: 5,
};

/* Pie chart slice colors (used in order) */
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

/* Set Dimensions of Canvas, Pie Chart, and Pie Chart Legend */
const borderWidth = 64;
const pieDiameter = 800;
const radius = pieDiameter / 2;
const pieLegendMargin = 20;
const canvasWidth = borderWidth * 2 + pieDiameter;
const legendSquareLength = 40;
const legendSquareMargin = 10;
const centerX = radius + borderWidth;
const centerY = radius + borderWidth;

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

function drawSlice(context, sliceData) {
    const { startAngle, endAngle, index } = sliceData;
    context.fillStyle = colors[index];
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
        context.font = "bold 36px NotoSansMono";
        context.fillText(`${percentage}%`, positionX - 20, positionY);
    });
}

function createSlices(context, sliceDetails) {
    const { grandTotal, pieChartData } = sliceDetails;
    const labels = [];
    const legendDetails = [];
    let startAngle = 0;

    Object.keys(pieChartData).forEach((key, index) => {
        const pieChartDetails = { pieChartData, key, grandTotal, startAngle };
        const endAngle = startAngle + getSliceAngle(pieChartDetails);
        const sliceData = { ...pieChartData, endAngle, index };

        drawSlice(context, sliceData);
        handleSliceLabels(pieChartDetails, labels);
        handleLegendDetails(legendDetails, key, index);
        startAngle = endAngle;
    });
    labelSlices(context, labels, sliceDetails);
    return legendDetails;
}

function handleSliceLabels(pieChartDetails, labels) {
    const { key } = pieChartDetails;
    const labelX = getSliceLabelPositionX(pieChartDetails);
    const labelY = getSliceLabelPositionY(pieChartDetails);
    labels.push({
        objectKey: key,
        positionX: labelX,
        positionY: labelY,
    });
}

function handleLegendDetails(legendDetails, key, index) {
    legendDetails.push({
        objectKey: key,
        color: colors[index],
    });
}

function getSliceAngle(chartDetails) {
    const { pieChartData, key, grandTotal } = chartDetails;
    return (2 * Math.PI * pieChartData[key]) / grandTotal;
}

function getSliceLabelPositionX(chartDetails) {
    const { startAngle, sliceAngle } = chartDetails;
    return (
        radius +
        borderWidth +
        (radius / 2) * Math.cos(startAngle + sliceAngle / 2)
    );
}

function getSliceLabelPositionY(chartDetails) {
    const { startAngle, sliceAngle } = chartDetails;
    return (
        radius +
        borderWidth +
        (radius / 2) * Math.sin(startAngle + sliceAngle / 2)
    );
}

function createLegend(context, categories) {
    let currentY = borderWidth + pieDiameter + pieLegendMargin;

    categories.forEach((category) => {
        const legendDetails = { currentY, category };
        createLegendSquare(context, legendDetails);
        createLegendText(context, legendDetails);

        // Move Y position down to next item in legend
        currentY += legendSquareLength + legendSquareMargin;
    });
}

function createLegendSquare(context, legendDetails) {
    const { currentY, category } = legendDetails;
    context.fillStyle = category.color;
    context.fillRect(
        borderWidth,
        currentY,
        legendSquareLength,
        legendSquareLength
    );
}

function createLegendText(context, legendDetails) {
    const { category, squareLength, squareMargin, currentY } = legendDetails;
    context.fillStyle = "#000000"; // Black
    context.font = "24px NotoSansMono";
    context.fillText(
        category.objectKey,
        borderWidth + squareLength + squareMargin,
        currentY + 28
    );
}

function createPieChart(pieChartData, res) {
    const legendHeight = 50 * Object.keys(pieChartData).length;
    const canvasHeight =
        borderWidth * 2 + pieDiameter + pieLegendMargin + legendHeight;
    const grandTotal = sumObjectValues(pieChartData);
    const pieDetails = { grandTotal, pieChartData };
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const context = canvas.getContext("2d");
    const categories = createSlices(context, pieDetails);
    createLegend(context, categories);
    const imageID = createImageID();
    const stream = canvas.createPNGStream();
    uploadPNG(stream, imageID, res);
}

function sumObjectValues(obj) {
    return Object.values(obj).reduce((prev, curr) => prev + curr, 0);
}

function uploadPNG(pngStream, imageID, response) {
    const s3 = new aws.S3();
    const params = {
        Bucket: process.env.AWS_BUCKETNAME,
        Key: `${imageID}.png`,
        Body: pngStream,
        ContentType: "image/png",
    };

    uploadToS3(s3, params, response);
}

function uploadToS3(s3Instance, parameters, response) {
    s3Instance.upload(parameters, (err, data) => {
        if (err) {
            console.log(err);
            response.status(400).json({ status: "error", url: null });
        } else {
            response
                .status(200)
                .json({ status: "success", url: data.Location });
        }
    });
}

/* Top level request handler for the Next.js API functionality */
export default function requestHandler(req, res) {
    const pieChartData = req.body || userData;
    try {
        createPieChart(pieChartData, res);
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: "error", url: null });
    }
}

/* Allows static files in the public root folder to be consumed by the API */
export const config = {
    unstable_includeFiles: ["public"],
};
