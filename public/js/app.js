const form = document.querySelector('form')
const search = document.querySelector('input')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  console.log(search.value);
  if (search.value !== '') {
    fetch('http://localhost:3000/app/weather/api?search=' + search.value).then((res) => {
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
  } else {
    alert('Please input something')
  }
})
