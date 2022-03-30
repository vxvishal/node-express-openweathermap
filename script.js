const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>
{
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res)
{
    // console.log(req.body.placeName)
    console.log("post recieved");
    const link = "https://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=69dcc11f0f7faac30a3a60fbb471d7f6&units=metric";

    https.get(link, function (response) 
    {
        console.log(response);

        response.on('data', function (data)
        {
            const weatherinfo = JSON.parse(data);
            const temperature = weatherinfo.main.temp;

            // console.log(temperature);

            res.send(String(temperature));
        });
    });

    // res.send("server is running here")
})

app.listen(3000, function () 
{
    console.log('server is running');
});