import { createStudent } from "./index";

export default function handler(req, res) {
    const { studentCount } = req.query;

    res.status(200).json(createMultipleStudents(studentCount));
}

export function createMultipleStudents(numberOfStudents) {
    const students = [];
    const num = Number(numberOfStudents);

    if (Number.isNaN(num) || !Number.isInteger(num) || num < 1) {
        return {
            error: "expected input to be an integer greater than zero.",
        };
    }

    for (let i = 0; i < numberOfStudents; i++) {
        students.push(createStudent());
    }

    return students;
}
