'use strict';

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

const API = 'AIzaSyC2lenB028Fiz-60ypyDaJnFjur2u-JiYE';

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyC2lenB028Fiz-60ypyDaJnFjur2u-JiYE
// https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=AIzaSyC2lenB028Fiz-60ypyDaJnFjur2u-JiYE


service.get('/service/:location', (req, res, next) => {
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ req.params.location + '&key=AIzaSyC2lenB028Fiz-60ypyDaJnFjur2u-JiYE', (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500);
        }

        let location = response.body.results[0].geometry.location;
        let timestamp = +moment().format('X');

        request.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + location.lat + ',' + location.lng + '&timestamp=' + timestamp + '&key=AIzaSyC2lenB028Fiz-60ypyDaJnFjur2u-JiYE', (err, response) => {
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