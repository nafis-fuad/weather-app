'use strict';
// this file contains the api key

// read the .env file if dev environment
if (process.env.NODE_ENV !== 'production') {
	const result = require('dotenv').config();
	if (result.error) {
		console.log('There was an error while reading the environment variables.');
		throw result.error;
	}
}

const config = { key: process.env.key };

module.exports = config;
