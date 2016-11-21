var config = require('config.json');
var express = require('express');
var router = express.Router();
var chatService = require('services/chat.service');

// routes
router.post('/api/chat/saveChat', saveChat);
router.get('/api/chat/getAllChat', getAllChat);

module.exports = router;


function saveChat(req, res) {
    chatService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllChat(req, res) {
    chatService.find()
        .then(function (res) {
            if (res) {
                res.send(res);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

