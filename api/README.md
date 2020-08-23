# API description
This API allow you to get weather and real time for a place you have chozen

# Resources used:
* [Postman-request](https://www.npmjs.com/package/postman-request): 2.88.1-postman.24
* [Weatherstack API](https://weatherstack.com/)
* [World time API](https://worldtimeapi.org/)
* [Mapbox geocode API](https://docs.mapbox.com/api/search/#geocoding)

# Configuration
### First of all you need to enter your API tokens of __Weatherstack__ and __Mapbox__ services
You can do it into ***tokenConfig.js*** file here:
```
/* Mapbox API token */
const geocodeToken = 'YourToken';
/* Weatherstack API token */
const weatherToken = 'YourToken';
```
### Then you need to require API file
```
const api = require('./generalApi.js')
```
**This API _can't work_ without _other files_**
# Documentation
### Structure of query
```
api('location', callback(err, res))
```
#### location
Location can be more than city or a country, for example: rivers, places, streets etc.
More about valid locations in [offical Mapbox documentation](https://docs.mapbox.com/api/search/#data-types)
#### callback
Callback have two arguments error and response
* Errors:
There are 2 error types, **404** and **403**
Error 404 errors you that place you wish to find is missing in data base
Error 403 errors you that server ther contains data is not responding or if you work on local host, your internet conection is corrupted
Before each error there is a string that is informing you which API part has an error
**For example:**
```
console.log(err, res)

Geocode API 404 undefined
```
or
```
console.log(err, res)

Weather API 403 undefined
```
**If there is an error on _Geocode API_ part or _Weather API_ parts the response always will be _undifined_ and code won't be running after error, but if there is an error in the part of _Time API_, the response would be like this:**
```
console.log(err, res)

Time API 404 [{/*Geocode response*/},{/*Weather response*/}, undefined]
```
**This solution is due to the reliability of the Time API server, so if you would like to use this API, you would be better if you change Time API**
Of course in places there are comments will be response, not comments
* Response
Response is an array, that contains three objects of response data:
```
[{/*Geocode response*/},{/*Weather response*/}, {/*Time response*/}]
```
##### Geocode response
The geocode response object contains two element which are latitude and longitude:
```
{lat: 12.3456, lon: -12.3456}
```
##### Weather response
The weather response object contains:
 1. **timezone_id:** 'Europe/London',
 2. **city:** 'Cubitt Town',
 3. **country:** 'United Kingdom',
 4. **weatherTime:** '08:04 AM', *Time when the observatory took measurements*
 5. **temperature:** 17,
 6. **weatherDescription:** Partly cloudy', *Here could be more than one description*
 7. **weatherVForm:** [ ' is ', 'description' ] *If in the object above there is more then one description, value will be [' are ', ' descriptions ']*

##### Time response
The time response object contains:
  1. **dayOfYear:** 236,
  2. **weekNumber:** 34,
  3. **dayOfWeek:** 0,
  4. **year:** '2020',
  5. **month:** '08',
  6. **day:** '23',
  7. **hour:** '09',
  8. **minute:** '04',
  9. **second:** '15'

#### Real example
**Example of right query**
```
api('London', (err, res) => {
  console.log(err, res)
})


undefined [ { lat: 51.50722, lon: -0.1275 },
  { timezone_id: 'Europe/London',
    city: 'Cubitt Town',
    country: 'United Kingdom',
    weatherTime: '08:04 AM',
    temperature: 17,
    weatherDescription: 'Partly cloudy',
    weatherVForm: [ ' is ', 'description' ] },
  { dayOfYear: 236,
    weekNumber: 34,
    dayOfWeek: 0,
    year: '2020',
    month: '08',
    day: '23',
    hour: '09',
    minute: '04',
    second: '15' } ]
```
**Example of wrong place**
```
api('Londonksksksksk', (err, res) => {
  console.log(err, res)
})

Geocode API 404 undefined
```
