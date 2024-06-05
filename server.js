const express = require('express');
const app = express()
const https = require('https');

const apiKey = {};//Enter your API key here

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=varanasi&appid=' + apiKey + '&units=metric'
  https.get(url, (response) => {
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const feelLike = weatherData.main.feels_like;
      const description = weatherData.weather[0].description;
      const name = weatherData.name;
      const humidity = weatherData.main.humidity;
      const pressure = weatherData.main.pressure;
      const windSpeed = weatherData.wind.speed;
      res.render('index', { temp: temp, feelLike: feelLike, description: description, city: name, humidity: humidity, windSpeed: windSpeed, pressure: pressure, error: null })
    })
  });
})

app.post('/', function (req, res) {
  let city = req.body.city;
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric'
  https.get(url, (response) => {
    // console.log(response.statusCode); // 200 means successful responce
    response.on('data', (data) => {
      // console.log(data); // This is in Hexcode
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const feelLike = weatherData.main.feels_like;
      const description = weatherData.weather[0].description;
      const name = weatherData.name;
      const humidity = weatherData.main.humidity;
      const pressure = weatherData.main.pressure;
      const windSpeed = weatherData.wind.speed;
      // res.send(`<h1>The Temperature in Varanasi is ${temp} Degree celcius</h1>`) //We can use res.send only once
      res.render('index', { temp: temp, feelLike: feelLike, description: description, city: name, humidity: humidity, windSpeed: windSpeed, pressure: pressure, error: null })
    })
  })
})

app.listen(5000, function () {
  console.log('Server is running on port 5000!');
  console.log('http://localhost:5000/');
})


