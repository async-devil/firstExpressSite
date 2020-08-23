const path = require("path");
const express = require("express");
const expressip = require('express-ip');
const PORT = process.env.PORT || 5000;
const hbs = require("hbs");

const viewsDirPath = path.join(__dirname, "../templates/views");
const publicDirPath = path.join(__dirname, "../public");
const partialsDirPath = path.join(__dirname, "../templates/partials");

const app = express();

app.set("view engine", "hbs");
app.set("views", viewsDirPath);
app.set('trust proxy', true);
app.set("PORT", PORT);
hbs.registerPartials(partialsDirPath);

app.use(expressip().getIpInfoMiddleware);
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Hello, world!",
    name: "Tim",
    page: "Main"
  });
  res.send(req.ipInfo, req.ipInfo.city, req.ipInfo.country)
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

app.get("/app/*", (req, res) => {
  res.render("404", {
    page: "App",
    pageLoc: "app ",
    pageType: "404"
  });
});

app.get('/product', (req, res) => {
  if (!req.query.search) {
    return res.send({error: 'There is no search query'})
  }
  console.log(req.header('x-forwarded-for') || req.connection.remoteAddress);
  res.send({products: []})
})

app.get("*", (req, res) => {
  res.render("404", {
    page: "404",
    pageLoc: ""
  });
});

app.listen(app.get('PORT'), () => {
  console.log("Server is on port 5000");
});
