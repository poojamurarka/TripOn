var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('chat');

var service = {};

service.getById = getById;
service.create = create;

module.exports = service;

function getById(_id) {
    var deferred = Q.defer();

    db.chat.findById(_id, function (err, chat) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (chat) {
            // return user (without hashed password)
            //deferred.resolve(_.omit(chat, 'hash'));
            deferred.resolve();
            console.log(chat);
        } else {
            // chat not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(data) {
    var deferred = Q.defer();

    saveChatMessage();
    function saveChatMessage() {
        var chatMessage = {username : data.username , message : data.message};

        db.chat.insert(
            chatMessage,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}
