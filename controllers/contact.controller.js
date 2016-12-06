var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    res.render('contact');
});

router.get('/contact', function (req, res) {
    res.render('contact');
});
module.exports = router;

