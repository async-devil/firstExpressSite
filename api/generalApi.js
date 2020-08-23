const geocodeApi = require('./geocodingApi.js');
const weatherApi = require('./weatherApi.js');
const timeApi = require('./timeApi.js');

var data = []

function getData(location, callback) {
  geocodeApi(location, (err, res) => {
    if (err === undefined) {
      data.push(res)
      var {
        lat,
        lon
      } = res;
      weatherApi(lat, lon, (err, res) => {
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

module.exports = getData;
