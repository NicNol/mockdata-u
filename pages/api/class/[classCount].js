import { createClass } from "./index";

export default function handler(req, res) {
    const { classCount } = req.query;

    res.status(200).json(createMultipleClasses(classCount));
}

export function createMultipleClasses(numberOfClasses) {
    const classes = [];
    const num = Number(numberOfClasses);

    if (Number.isNaN(num) || !Number.isInteger(num) || num < 1) {
        return {
            error: "expected input to be an integer greater than zero.",
        };
    }

    for (let i = 0; i < numberOfClasses; i++) {
        classes.push(createClass());
    }

    return classes;
}
