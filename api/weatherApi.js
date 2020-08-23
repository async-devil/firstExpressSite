const request = require("postman-request");
const tokens = require('./tokenConfig.js');

const {weatherToken} = tokens;

function getWeather(lat, lon, callback) {
  const weatherUrl = "http://api.weatherstack.com/current?access_key=" + weatherToken + "&query=" + lat + ', ' + lon;
  request({
    url: weatherUrl
  }, (error, response) => {
    if (!error) {
      try {
        var temp;
        var weatherDescription = ''
        var weatherCount = ''
        var weatherDesc = ''
        var txt = JSON.parse(response.body);
        var location = txt.location
        var current = txt.current
        if (current.weather_descriptions.length > 1) {
          weatherCount = ' are: '
          weatherDesc = 'descriptions'
          for (let i = 0; i < current.weather_descriptions.length - 1; i++) {
            weatherDescription = weatherDescription + current.weather_descriptions[i] + ', '
          }
          weatherDescription = weatherDescription + current.weather_descriptions[current.weather_descriptions.length - 1]
        } else {
          weatherDescription = current.weather_descriptions[0]
          weatherCount = ' is '
          weatherDesc = 'description'
        }
        var weatherData = {
          timezone_id: location.timezone_id,
          city: location.name,
          country: location.country,
          weatherTime: current.observation_time,
          temperature: current.temperature,
          weatherDescription,
          weatherVForm: [weatherCount, weatherDesc]
        }
        callback(undefined, weatherData)
      } catch (err) {
        callback('404', undefined)
      }
    } else {
      callback('403', undefined)
    }
  })
}

module.exports = getWeather;
