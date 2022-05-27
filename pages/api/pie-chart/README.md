# Pie Chart Microservice

The Pie Chart microservice is, perhaps unsurprisingly, a microservice that generates pie charts! Users can make HTTP `POST` requests to an API endpoint with data that should be represented as a pie chart. The microservice can handle a maximum of 10 different categories to be shown on the pie chart.

![Preview of Generated Pie Chart](/public/images/preview-pie-chart.png?raw=true)

# API Calls

At this time, the API does not require an API key. Make API requests by sending HTTP `POST` requests to the desired URL. Make all requests to the following endpoint: `https://mockdata-u.vercel.app/api/pie-chart`

---

Example request:

```json
{
    "Classical music": 10,
    "Alternative rock": 14,
    "Pop": 2,
    "Jazz": 12,
    "Emo": 5
}
```

The values must be numbers (float or integer) and represent the quantity of each. A key-value is divided by the total of all key-values to determine its portion of the pie chart and corresponding percentage label.

---

Example response:

```json
{
    "status": "success",
    "url": "https://mockdata-u.s3.us-west-2.amazonaws.com/TYdLs3kqLVqy.png"}
}
```

If an error occurs (likely due to the format of the request), the response will be:

```json
{
    "status": "error",
    "url": null
}
```
