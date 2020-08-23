const path = require("path");
const api = require('./utils/generalApi.js');
const express = require("express");
const hbs = require("hbs");

const viewsDirPath = path.join(__dirname, "../templates/views");
const publicDirPath = path.join(__dirname, "../public");
const partialsDirPath = path.join(__dirname, "../templates/partials");

const app = express();

app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {page: 'Main'});
});

app.get("/help", (req, res) => {
  res.render("help", {page: "Help"});
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    page: "Help",
    pageLoc: "help ",
    pageType: "404"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {page: "About"});
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    page: "About",
    pageLoc: "about ",
    pageType: "404"
  });
});

app.get("/app", (req, res) => {
  res.render("app", {page: "App"});
});

app.get('/app/weather', (req, res) => {
  res.render("weather", {
    page: "Weather",
    pageLoc: "app ",
    pageType: 'App'
  });
})

app.get('/app/weather/api', (req, res) => {
  if (!req.query.search) {
    return res.send({error: 'There is no search query'})
  }
  api(req.query.search, (error, response) => {
    if (!error) {
      var geoData = response[0]
      var weatherData = response[1]
      var timeData = response[2]
      var data = {
        error,
        geoData,
        weatherData,
        timeData
      }
      console.log(data);
      return res.send(data)
    } else if (error === 'Time API 404') {
      var geoData = response[0]
      var weatherData = response[1]
      var timeData = undefined;
      var data = {
        error,
        geoData,
        weatherData,
        timeData
      }
      console.log(data);
      return res.send(data)
    } else {
      var data = {
        error,
        geoData: undefined,
        weatherData: undefined,
        timeData: undefined
      }
      console.log(data);
      return res.send(data)
    }
  })
})

app.get("/app/*", (req, res) => {
  res.render("404", {
    page: "App",
    pageLoc: "app ",
    pageType: "404"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    page: "404",
    pageLoc: ""
  });
});

app.listen(3000, () => {
  console.log("Server is on port 3000");
});
