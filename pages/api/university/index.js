import { faker } from "@faker-js/faker";

export default function handler(req, res) {
    res.status(200).json(createUniversity());
}

export function createUniversity() {
    const { direction, streetName, city, stateAbbr, zipCodeByState } =
        faker.address;
    const streetAddress = `${buildingNumber()} ${direction(
        true
    )} ${streetName()} ${roadType()}`;
    const cityName = city();
    const state = stateAbbr();
    const zip = zipCodeByState(state);

    const universityName = `${cityName} ${getRandomInstitution()}`;

    return {
        name: universityName,
        streetAddress: streetAddress,
        city: cityName,
        state: state,
        zip: zip,
    };
}

function getRandomValueFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function roadType() {
    const roadTypes = [
        "Avenue",
        "Boulevard",
        "Circle",
        "Drive",
        "Highway",
        "Lane",
        "Loop",
        "Parkway",
        "Road",
        "Street",
        "Terrace",
        "Way",
    ];

    return getRandomValueFromArray(roadTypes);
}

function buildingNumber() {
    return `${Math.floor(Math.random() * 99899) + 100}`;
}

function getRandomInstitution() {
    const institutions = [
        "University",
        "College",
        "Institute",
        "Institute of Technology",
    ];

    return getRandomValueFromArray(institutions);
}
