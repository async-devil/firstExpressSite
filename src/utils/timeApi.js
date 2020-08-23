const request = require("postman-request");

function getTime(timezone_id, callback) {
  const timeUrl = 'http://worldtimeapi.org/api/timezone/' + timezone_id;
  request({
    url: timeUrl
  }, (error, response) => {
    if (!error) {
      try {
        var data = JSON.parse(response.body);
        var txt = data.datetime.replace(/(\..+$)/, '');
        var slice = txt.split('T')
        var date = slice[0].split('-');
        var time = slice[1].split(':');

        var timeData = {
          dayOfYear: data.day_of_year,
          weekNumber: data.week_number,
          dayOfWeek: data.day_of_week,
          year: date[0],
          month: date[1],
          day: date[2],
          hour: time[0],
          minute: time[1],
          second: time[2]
        }
        callback(undefined, timeData)
      } catch (err) {
        callback('404', undefined)
      }
    } else {
      callback('403', undefined)
    }
  })
}

module.exports = getTime;
