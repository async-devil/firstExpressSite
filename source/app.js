const path = require("path");
const express = require("express");
const hbs = require("hbs");

//test

const viewsDirPath = path.join(__dirname, "../templates/views");
const publicDirPath = path.join(__dirname, "../public");
const partialsDirPath = path.join(__dirname, "../templates/partials");

const app = express();

app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Hello, world!",
    name: "Tim",
    page: "Main"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    page: "Help"
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    page: "Help",
    pageLoc: "help ",
    pageType: "404"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    page: "About"
  });
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    page: "About",
    pageLoc: "about ",
    pageType: "404"
  });
});

app.get("/app", (req, res) => {
  res.render("app", {
    page: "App"
  });
});

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
