const request = require("postman-request");

function getGeocode(place, callback) {
  const token = 'pk.eyJ1IjoicHVycHJ1cnAiLCJhIjoiY2tlNXJmNTZtMTVyazJ5bXM2Y3p5ZWp0OSJ9.q6mt8GbQaaJvLkZ50nLyEA';
  var geocodingUrl = encodeURI('https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=' + token + '&limit=1');
  request({
    url: geocodingUrl
  }, (error, response) => {
    if (!error) {
      try {
        var data = JSON.parse(response.body);
        data = data.features[0].geometry.coordinates;
        var parsedData = {
          x: data[1],
          y: data[0]
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
