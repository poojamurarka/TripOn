require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
//var mongo = require('mongoskin');
//var db = mongo.db(config.connectionString, { native_parser: true });

var mongoose = require('mongoose');
var chatMessage;
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    var chatSchema = new mongoose.Schema({
        username: { type: String }
        , message: String
    });

// Compile a 'Movie' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Movies' for these documents.
    chatMessage = mongoose.model('chat', chatSchema);
});

mongoose.connect('mongodb://localhost:27017/TripOn');

var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//require('./app/chat')(io);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/forgetPassword', require('./controllers/forgetPassword.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// start server
/*var server = app.listen(3000, function () {
 console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
 });
 */

var server = http.listen(3000, function(){
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);

});
var fisrtTimeConnection = true;
var listOfOnlinePeople = [];
io.on('connection', function(socket){
    //console.log("nsd : " +socket.id);
    socket.on('chat message', function(data){
        io.emit('chat message', data);
        var chat = new chatMessage({
            username:  data.name
            , message: data.msg
        });

        chat.save(function(err, thor) {
            if (err) return console.error(err);
        });
    });

    socket.on('get All Chat', function(){
        chatMessage.find(function (err, chats) {
            if (err) return console.error(err);
            io.emit('get All Chat', chats);
        });
    });

    socket.on("typing", function(data) {
            io.emit("isTyping", data);
    });
    socket.on("disconnect", function() {
        console.log(socket.id + ' disconnected');
        var id = socket.id;
        for(var i = 0; i < listOfOnlinePeople.length; i++) {
            if(listOfOnlinePeople[i].socketId == id) {
                listOfOnlinePeople.splice(i, 1);
                io.emit("getOnlinePeople",{"listOfOnlinePeople" : listOfOnlinePeople});
                break;
            }
        }
        console.log(listOfOnlinePeople);
    });
    socket.on("joinserver", function(data) {
        //console.log('disconnect');
        console.log(socket.id + " : "+data.uname);
        listOfOnlinePeople.push({"socketId" : socket.id ,"username" : data.uname});
        io.emit("getOnlinePeople",{"listOfOnlinePeople" : listOfOnlinePeople});
    });
});