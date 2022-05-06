import { v4 as uuidv4 } from "uuid";
const { createCanvas } = require("canvas");
const fs = require("fs");

const userData = {
    "Classical music": 10,
    "Alternative rock": 14,
    Pop: 2,
    Jazz: 12,
    Emo: 5,
};

// Set Dimensions of Canvas
const borderWidth = 64;
const pieDiameter = 800;
const pieLegendMargin = 20;
const legendHeight = 50 * Object.keys(userData).length;
const canvasWidth = borderWidth * 2 + pieDiameter;
const canvasHeight =
    borderWidth * 2 + pieDiameter + pieLegendMargin + legendHeight;

const grandTotal = Object.values(userData).reduce(
    (prev, curr) => prev + curr,
    0
);

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

function labelSlices(context, labels) {
    labels.forEach((label, index) => {
        const { objectKey, positionX, positionY } = label;
        const percentage = Math.round((100 * userData[objectKey]) / grandTotal);
        context.fillStyle = "#000";
        context.font = "bold 36px Arial";
        context.fillText(`${percentage}%`, positionX - 20, positionY);
    });
}

function createSlices(context) {
    const radius = Math.min(pieDiameter / 2, pieDiameter / 2);
    const labels = [];
    const output = [];
    let startAngle = 0;

    Object.keys(userData).forEach((key, index) => {
        const sliceAngle = (2 * Math.PI * userData[key]) / grandTotal;
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
    labelSlices(context, labels);
    return output;
}

function createLegend(context, categories) {
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

function createPieChart() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const context = canvas.getContext("2d");
    const categories = createSlices(context);
    createLegend(context, categories);
    const imageID = uuidv4().slice(-12);
    const out = fs.createWriteStream(`./public/pc/${imageID}.png`);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    return imageID;
}

export default function handler(req, res) {
    try {
        const imageID = createPieChart();
        const url = `http://${req.headers.host}/pc/${imageID}.png`;
        res.status(200).json({ status: "success", url: url });
    } catch (err) {
        res.status(400).json({ status: "error", url: null });
    }
}
