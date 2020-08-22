const geocodeApi = require('./geocodingApi.js');
const weatherApi = require('./weatherApi.js');
const timeApi = require('./timeApi.js');

var data = []

function getData(value, callback) {
  geocodeApi(value, (err, res) => {
    if (err === undefined) {
      data.push(res)
      var {
        x,
        y
      } = res;
      weatherApi(x, y, (err, res) => {
        if (err === undefined) {
          data.push(res)
          timeApi(res.timezone_id, (err, res) => {
            if (err === undefined) {
              data.push(res);
              callback(undefined, data)
            } else {
              data.push(undefined)
              callback('Time API ' + err, data)
            }
          })
        } else {
          callback("Weather API " + err, undefined);
        }
      })
    } else {
      callback('Geocode API ' + err, undefined)
    }
  })
}

getData('Kyiv', (err, data) => {
  console.log(err, data);
})
