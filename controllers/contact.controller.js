var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');




router.get('/', function (req, res) {
    console.log('loading');
    res.render('contact',{Message: ' '});
});

module.exports = router;

