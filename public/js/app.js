const form = document.querySelector('form')
const search = document.querySelector('input')

var weather = document.querySelector('#weatherOutput')
var time = document.querySelector('#timeOutput')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (search.value !== '') {
    weather.textContent = 'Loading...';
    time.textContent = '';
    fetch('weather/api?search=' + search.value).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          weather.textContent = 'Invalid query ' + data.error;
          time.textContent = '';
        } else if (data.error === 'Time API 404') {
          weather.textContent = 'For ' + data.weatherData.weatherTime + ' temperature was ' + data.weatherData.temperature + ' degrees and weather was ' + data.weatherData.weatherDescription.toLowerCase();
          time.textContent = 'Invalid query ' + data.error;
        } else {
          weather.textContent = 'For ' + data.weatherData.weatherTime + ' temperature was ' + data.weatherData.temperature + ' degrees and weather was ' + data.weatherData.weatherDescription.toLowerCase();
          time.textContent = 'Now is ' + data.timeData.year + '/' + data.timeData.month + '/' + data.timeData.day + ' ' + data.timeData.hour + ':' + data.timeData.minute + ':' + data.timeData.second;
        }
      })
    })
  } else {
    weather.textContent = 'Please enter value';
    time.textContent = '';
  }
})
