import { faker } from "@faker-js/faker";

export default function handler(req, res) {
    res.status(200).json(createUniversity());
}

export function createUniversity() {
    const streetAddress = `${getRandomBuildingNumber()} ${faker.address.direction(
        true
    )} ${faker.address.streetName()} ${getRandomRoadType()}`;
    const city = faker.address.city();
    const state = faker.address.stateAbbr();
    const zip = faker.address.zipCodeByState(state);

    const universityName = `${city} ${getRandomInstitution()}`;

    const university = {
        name: universityName,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zip: zip,
    };

    return university;
}

function getRandomRoadType() {
    const roadTypes = [
        "Street",
        "Avenue",
        " Boulevard",
        "Circle",
        "Highway",
        "Lane",
        "Loop",
        "Road",
        "Terrace",
        "Way",
        "Parkway",
        "Drive",
    ];

    const index = Math.floor(Math.random() * roadTypes.length);
    return roadTypes[index];
}

function getRandomBuildingNumber() {
    return `${Math.floor(Math.random() * 99899) + 100}`;
}

function getRandomInstitution() {
    const institutions = [
        "University",
        "College",
        "Institute",
        "Institute of Technology",
    ];

    const index = Math.floor(Math.random() * institutions.length);
    return institutions[index];
}
