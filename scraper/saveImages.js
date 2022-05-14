const fs = require("fs");
const request = require("request");

const imageFile = "./scraper/imageLinks.txt";

fs.readFile(imageFile, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const textFileLines = data.split("\r\n");
    textFileLines.pop(); // remove last element (empty string)
    textFileLines.forEach((line) => saveImage(line));
});

function saveImage(textLine) {
    const [filename, url] = textLine.split(": ");
    const fileLocation = `./public/images/${filename}.${getFileExtension(url)}`;
    downloadImage(url, fileLocation, () => null);
}

const downloadImage = (imageURL, filename, cb) => {
    const requestOptions = {
        url: imageURL,
        headers: {
            "User-Agent": "request",
        },
    };

    request.head(requestOptions, (err, res, body) => {
        request(requestOptions)
            .pipe(fs.createWriteStream(filename))
            .on("close", cb);
    });
};

function getFileExtension(fileName) {
    const pattern = /(?:\.([^.]+))?$/;
    const fileExtension = pattern.exec(fileName)[1];
    return fileExtension;
}
