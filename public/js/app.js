fetch('weather/api?search=London').then((res) => {
  res.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else if (data.error === 'Time API 404') {
      console.log(data.weatherData)
    } else {
      console.log(data.weatherData)
      console.log(data.timeData);
    }
  })
})
