const request = require("postman-request");
const tokens = require('./tokenConfig.js');

const {geocodeToken} = tokens;

function getGeocode(place, callback) {
  var geocodingUrl = encodeURI('https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=' + geocodeToken + '&limit=1');
  request({
    url: geocodingUrl
  }, (error, response) => {
    if (!error) {
      try {
        var data = JSON.parse(response.body);
        data = data.features[0].geometry.coordinates;
        var parsedData = {
          lat: data[1],
          lon: data[0]
        }
        callback(undefined, parsedData)
      } catch (err) {
        callback('404', undefined)
      }
    } else {
      console.log(error);
      callback('403', undefined)
    }
  })
}

module.exports = getGeocode;
