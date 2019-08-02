const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");

//defining path for public views and partials
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

//setting port for deployment
const port = process.env.PORT || 3030;

//setting up handlebars engine and views loaction
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialspath);
//hbs.registerPartials is used to register a partials used inside views

//serving up static files
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather forecast",
    name: "Prashant Rawal"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Prashant Rawal"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is some helpful text",
    name: "Prashant Rawal",
    title: "help"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please Provide an Address!"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Prashant Rawal",
    errormessage: "help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Prashant Rawal",
    errormessage: "Page not found"
  });
});

app.listen(port, () => {
  console.log(`we are listening on port ${port}`);
});

//npm config get prefix
