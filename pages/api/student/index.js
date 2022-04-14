import { faker } from "@faker-js/faker";

export default function handler(req, res) {
    res.status(200).json(createStudent());
}

export function createStudent() {
    const university = "university";
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(
        firstName,
        lastName,
        `${university}.edu`
    );

    const idNumber = generateIdNumber();

    const student = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        idNumber: idNumber,
    };

    return student;
}

function generateIdNumber() {
    const number = faker.datatype.number({ min: 1, max: 999999999 }).toString();
    const nineDigitString = number.padStart(9 - number.length, "0");
    const threeChunkArray = nineDigitString.match(/.{1,3}/g);

    return `${threeChunkArray[0]}-${threeChunkArray[1]}-${threeChunkArray[2]}`;
}
