'use strict';

const config = require('../config');

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

service.get('/service/:location', (req, res, next) => {
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ req.params.location + '&key=' + config.googleApiKey, (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500);
        }

        let location = response.body.results[0].geometry.location;
        let timestamp = +moment().format('X');

        request.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + location.lat + ',' + location.lng + '&timestamp=' + timestamp + '&key=' + config.googleApiKey, (err, response) => {
            if (err) {
                console.log(err);
                return res.status(500);
            }

            let result = response.body;
            let timeString = moment.unix(timestamp + result.dstOffset + result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');

            res.json({
                result: timeString
            });
        });
     });
});

module.exports = service;