const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { getGeoCodingData } = require("./utils/geocoding");
const { getWeatherData } = require("./utils/weather");
const app = express();

// paths declaration
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");
const partialsPath = path.join(__dirname, "../partials");

// Setting engine and paths and config
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDir));

hbs.registerPartials(partialsPath);

// Routes start
app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.get("/about", (req, res) => {
  console.log("req", req.headers, req.method, req.url, req.baseUrl);
  res.render("about.hbs", { title: "About Me", createdBy: "Kiran Siluveru" });
});

app.get("/help", (req, res) => {
  console.log("req", req.headers, req.method, req.url, req.baseUrl);
  res.render("help.hbs", { title: "Help & Support" });
});

app.get("/weather", (req, res) => {
  console.log("req", req.headers, req.method, req.url, req.baseUrl);
  if (!req?.query?.place) {
    res.send({ message: "place should not be empty" });
    return;
  }
  const place = req?.query?.place;
  getGeoCodingData(place, (error, data = {}) => {
    if (error) {
      res.send({ message: error });
      return;
    }
    const { latitude, longitude, placeName } = data;

    getWeatherData(latitude, longitude, (error, weatherData = {}) => {
      if (error) {
        res.send({ message: error });
        return;
      }
      res.send({ title: "Weather", place: req?.query?.place, latitude, longitude, placeName, ...weatherData });
      // res.render("weather.hbs", { title: "Weather", place: req?.query?.place, latitude, longitude, ...weatherData });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("notfound.hbs", { errorMessage: "Help article  not found " });
});

app.get("*", (req, res) => {
  res.render("notfound.hbs", { errorMessage: "Page not found, Please try modifying the URL" });
});

app.listen(3004, () => {
  console.log("App started!!!", Date.now());
});

// app.com
// app.com/about
// app.get("/weather", (req, res) => {
//   console.log("req", req.headers, req.method, req.url, req.baseUrl, req.query);
//   res.send("weather");
// });
// app.get("", (req, res) => {
//   res.send("<h1>Hello Express app</h1>");
// });

// app.get("/about", (req, res) => {
//   console.log("req", req.headers, req.method, req.url, req.baseUrl);
//   res.sendFile(publicDir + "/about.html");
// });
// app.get("/help", (req, res) => {
//   console.log("req", req.headers, req.method, req.url, req.baseUrl);
//   res.sendFile(publicDir + "/help.html");
// });
