"use strict";

const express = require("express");
const router = express.Router();
const request = require("request");
const api = require("../api.json");
const apiKey = api.key;


router.get("/", (req, res) => {
  return res.render("index");
});

router.post('/', (req, res) => {
  let city = req.body.placename;
  let url = `https://api.apixu.com/v1/current.json?key=${apiKey}&q=${city}`;

  request(url, (err, response, body) => {
    if (err) {
      res.render('error');
    } else {
      let weather = JSON.parse(body);
      if (response.statusCode !== 200) {
        res.render('error');
      } else {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", 0);

        const locationName = weather.location.name;
        const locationCountry = weather.location.country;
        const currentWeather = weather.current;
        const currentIsDay = currentWeather.is_day;
        const currentTemperature = currentWeather.temp_c;
        const currentConditionMessage = currentWeather.condition.text;
        const currentPrecipitation = currentWeather.precip_mm;
        const currentHumidity = currentWeather.humidity;
        const currentWind = currentWeather.wind_mph;
        const currentDateAndTime = response.headers.date;
        const currentConditionIconCode = currentWeather.condition.code;
        const templateData = {locationName, locationCountry, 
                              currentTemperature, currentConditionMessage, 
                              currentPrecipitation, currentHumidity, 
                              currentWind, currentDateAndTime,
                              currentIsDay, currentConditionIconCode};

        // if (currentIsDay === 1) {
        //   return res.render("day", templateData );
        // } else {
        //   return res.render("night", templateData );
        // }
          
        res.render("current", templateData);

      }
    }
  });
});


module.exports = router;
