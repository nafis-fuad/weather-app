'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config.js');
const apiKey = config.key;

router.get('/', (_, res) => {
	return res.render('index');
});

router.post('/', (req, res) => {
	const city = req.body.placename;
	const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`

	request(url, (err, response, body) => {
		if (err || JSON.parse(body).success === false) {
			res.render('error');
		} else {
			res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
			res.setHeader('Pragma', 'no-cache');
			res.setHeader('Expires', 0);

			const weather = JSON.parse(body);

			const templateData = {
				locationName: weather.location.name,
				locationCountry: weather.location.country,
				currentTemperature: weather.current.temperature,
				currentConditionMessage: weather.current.weather_descriptions,
				currentPrecipitation: weather.current.precip,
				currentHumidity: weather.current.humidity,
				currentWind: weather.current.wind_speed,
				currentDateAndTime: response.headers.date,
				currentIsDay: weather.current.is_day !== "no",
			};
			res.render('current', templateData);
		}
	});
});

module.exports = router;
