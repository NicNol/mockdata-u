# [MockData U.](https://mockdata-u.vercel.app/)

MockData U. is a project that allows users to mock fake but realistic data related to a college or university. The project is intended for software developers and UI designers of educational software. It allows users to generate data for one or more students, classes, or universities using an API or a GUI. You can access a demo of this project [here](https://mockdata-u.vercel.app/).

![Preview of MockData U. Home Page](/public/images/preview-homepage.png?raw=true)
![Preview of MockData U. Mock Student Page](/public/images/preview-mock-student.png?raw=true)

# API Calls

At this time, the API does not require an API key. Make API requests by sending HTTP `GET` requests to the desired URL.

URLs are relative to the hosting domain, currently: `https://mockdata-u.vercel.app/`

## Mock Student Data

To mock data for a single student, use the end point: `/api/student/`

To mock data for multiple students, enter an integer after the above call corresponding to the number of students you want to mock. Example: `/api/student/5` would mock data for 5 students.

Example student:

```json
{
    "firstName": "Kathlyn",
    "lastName": "Goyette",
    "email": "Kathlyn.Goyette@university.edu",
    "idNumber": "933-424-894"
}
```

## Mock Class Data

To mock data for a single class, use the end point: `/api/class/`

To mock data for multiple classes, enter an integer after the above call corresponding to the number of classes you want to mock. Example: `/api/class/5` would mock data for 5 classes.

Example class:

```json
{
    "classTitle": "LIB 337",
    "department": "Library and Information Science",
    "quarter": "Winter 2022",
    "instructor": "Angeline Stokes"
}
```

## Mock University Data

To mock data for a single university, use the end point: `/api/university/`

To mock data for multiple universities, enter an integer after the above call corresponding to the number of universities you want to mock. Example: `/api/university/5` would mock data for 5 universities.

Example university:

```json
{
    "name": "Somerville College",
    "streetAddress": "2841 E Schoen River Street",
    "city": "Somerville",
    "state": "MS",
    "zip": "55540"
}
```

# Development

## Prerequisites

1. [Node.js](https://nodejs.dev/learn/how-to-install-nodejs), v16 LTS (recommended) or higher
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), v8.6.0 (recommended) or higher

## Install

Download the current codebase or create a fork. Navigate to the root of the project directory in your terminal window and call `npm install`. This will install the required node module dependencies into your project folder.

## Run

Next, call `npm run dev`. This will start [Next.js](https://nextjs.org/) in development mode. Open a browser window and navigate to `localhost:3000`. This is the project running locally on your machine. 🎉🎉🎉
