import { createUniversity } from "./index";

export default function handler(req, res) {
    const { universityCount } = req.query;

    res.status(200).json(createMultipleClasses(universityCount));
}

export function createMultipleClasses(numberOfUniversities) {
    const classes = [];
    const num = Number(numberOfUniversities);

    if (Number.isNaN(num) || !Number.isInteger(num) || num < 1) {
        return {
            error: "expected input to be an integer greater than zero.",
        };
    }

    for (let i = 0; i < numberOfUniversities; i++) {
        classes.push(createUniversity());
    }

    return classes;
}
