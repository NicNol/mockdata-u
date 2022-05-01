/* 
    Adopted from: https://code.tutsplus.com/tutorials/how-to-draw-a-pie-chart-and-doughnut-chart-using-javascript-and-html5-canvas--cms-27197
*/

import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

export default function Canvas(props) {
    const canvasWidth = 800;
    const canvasHeight = 800;
    const canvasRef = useRef(null);
    const legendRef = useRef(null);
    const userData = {
        "Classical music": 10,
        "Alternative rock": 14,
        Pop: 2,
        Jazz: 12,
        Emo: 5,
    };

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
            const percentage = Math.round(
                (100 * userData[objectKey]) / grandTotal
            );
            context.fillStyle = "#000";
            context.font = "bold 36px Arial";
            context.fillText(`${percentage}%`, positionX - 20, positionY);
        });
    }

    function createSlices(context) {
        const radius = Math.min(canvasWidth / 2, canvasHeight / 2);
        const labels = [];
        const output = [];
        let startAngle = 0;

        Object.keys(userData).forEach((key, index) => {
            const sliceAngle = (2 * Math.PI * userData[key]) / grandTotal;
            const labelX =
                canvasWidth / 2 +
                (radius / 2) * Math.cos(startAngle + sliceAngle / 2);
            const labelY =
                canvasHeight / 2 +
                (radius / 2) * Math.sin(startAngle + sliceAngle / 2);

            drawSlice(
                context,
                canvasWidth / 2,
                canvasHeight / 2,
                radius,
                startAngle,
                startAngle + sliceAngle,
                colors[index]
            );
            console.log(radius);
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

    function createLegend(categories) {
        const legend = legendRef.current;
        const HTML = categories.reduce(
            (prev, curr) => `${prev}
                <div>
                    <span style='display:inline-block;width:40px;height:40px;background-color:${curr.color};'>
                        &nbsp;
                    </span>
                    <span style='font-size:24px;position:relative;top:10px;'>${curr.objectKey}</span>
                </div>`,
            ""
        );
        legend.innerHTML = HTML;
    }

    function createPieChart() {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const categories = createSlices(context);
        createLegend(categories);
    }

    useEffect(createPieChart, []);

    return (
        <Box m="16">
            <canvas ref={canvasRef}></canvas>
            <div ref={legendRef}></div>
        </Box>
    );
}
