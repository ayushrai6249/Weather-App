const express = require('express'); // To Import express framework
const app = express() // Creates an instance of an Express application
const https = require('https'); // Node.js module to make HTTPS requests

const apiKey = '13ca0c89d8cd04873921fbc32a542965';//Enter your API key here

// To use external file in .ejs
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// To get hexcode data in readable form
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Sets EJS as the templating engine
app.set('view engine', 'ejs')

// When a user visits http://localhost:5000/, this function will be executed
app.get('/', (req, res) =>{
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=varanasi&appid=' + apiKey + '&units=metric'
  https.get(url, (response) => { // The response callback handles the API response
    response.on('data', (data) => { // Listens for chunks of data from the API response
      const weatherData = JSON.parse(data); // Parse data in readable form
      const temp = weatherData.main.temp; 
      const feelLike = weatherData.main.feels_like;
      const description = weatherData.weather[0].description;
      const name = weatherData.name;
      const humidity = weatherData.main.humidity;
      const pressure = weatherData.main.pressure;
      const windSpeed = weatherData.wind.speed;
      res.render('index', { temp: temp, feelLike: feelLike, description: description, city: name, humidity: humidity, windSpeed: windSpeed, pressure: pressure, error: null })
      // passing the temperature (temp) ..., error (set to null) to the template.
    })
  });
})

// When a user submits a form to http://localhost:5000/, this function will be executed.
app.post('/', (req, res) =>{
  let city = req.body.city; // Extract city name when form in .ejs file is submitted
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


