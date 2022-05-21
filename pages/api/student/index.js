import { faker } from "@faker-js/faker";

export default function handler(req, res) {
    res.status(200).json(createStudent());
}

export function createStudent() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName, `university.edu`);

    return {
        firstName: firstName,
        lastName: lastName,
        email: email,
        idNumber: generateIdNumber(),
    };
}

function getThreeDigitNumberAsString() {
    const number = faker.datatype.number({ min: 1, max: 999 }).toString();
    return number.padStart(3, "0");
}

function generateIdNumber() {
    return `${getThreeDigitNumberAsString()}-${getThreeDigitNumberAsString()}-${getThreeDigitNumberAsString()}`;
}
