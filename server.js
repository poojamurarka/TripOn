﻿require('rootpath')();
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
var hotelList;
var restaurant;
var feedback;
var event;
var ContactForm;
var FeedbackForm;
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
                                                                 // creating different schemas for different tables
    var chatSchema = new mongoose.Schema({
        username: { type: String }
        , message: String
    });
   var hotelSchema = new mongoose.Schema({
       Name: String,
       Location: {type: String},
        Address: { type: String },
        Description : { type: String },
        Rating : { type: String },
        Price : { type: String }
   });
    var feedbackSchema = new mongoose.Schema({
        Name: String,
        Email: {type: String},
        Phone: { type: String },
        message: { type: String }
    });
     var restaurantSchema = new mongoose.Schema({
        Name: String,
        Location: String,
        Address:  String,
        Description: String,
        Timings: String,
        Contact: String
    });
    var eventSchema = new mongoose.Schema({
        Name: String,
        Location: String,
        Venue:  String,
        Description: String,
        Timings: String
    });
    var ContactSchema = new mongoose.Schema({
        Email : String,
        Subject : String,
        Message: String

    });


// Compile a 'chat' model using the chatSchema as the structure.
// Mongoose also creates a MongoDB collection called 'chat' for these documents.
    chatMessage = mongoose.model('chat', chatSchema);
    hotelList = mongoose.model('hotels', hotelSchema); 
    restaurant = mongoose.model('restaurants', restaurantSchema);
    event = mongoose.model('events', eventSchema);
    ContactForm = mongoose.model('contact', ContactSchema);
    feedback = mongoose.model('feedbacks',feedbackSchema);
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
app.use('/home', require('./controllers/home.controller'));
app.use('/contact', require('./controllers/contact.controller'));
app.use('/event_view', require('./controllers/event_view.controller'));
app.use('/event_view1', require('./controllers/event_view1.controller'));
//var Hotels = require('./models/hotels');

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// make '/app' default route
app.get('/getQueries', function (req, res) {
    ContactForm.find()
        .then(function (data) {                                     // // retrieving all queries from db
            if (data) {
                res.send(data);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

});

app.post('/getQueries/:id', function (req, res) {

    ContactForm.remove({_id : req.params.id}, function(err) {                // deleting query through id
        if (!err) {
            res.send("success");
        }
        else {
            res.send("error");
        }
    });

});

app.get('/hotels', function (req, res) {
    hotelList.find()
        .then(function (hotels) {
            if (hotels) {
                res.send(hotels);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

});

app.get('/hotels/:address', function (req, res) {
    hotelList.find( { $or: [ { "Address": { "$regex": req.params.address, "$options": "i" } },{ "Location": { "$regex": req.params.address, "$options": "i" } }]})
        .then(function (hotels) {
            if (hotels) {
                res.send(hotels);                                           // retrieving data from db on custom search
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
                res.status(400).send(err);
        });

});

app.post('/hotels', function (req, res) {
    var hotel = new hotelList({
        Name:  req.body.Name,                                               //  assigning data to the modeled schema
        Location: req.body.Location,
        Address: req.body.Address,
        Description : req.body.Description,
        Rating : req.body.Rating,
        pricePerDay : req.body.pricePerDay
    });
    hotel.save(function(err, thor) {                                        // saving the hotel data in database
        if (err){
            return res.send("error");
        }else{
            console.log('hotel created');
            return res.send("success");
        }
    });
});

app.get('/Events', function (req, res) {
    event.find()
        .then(function (events) {
            if (events) {
                res.send(events);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

});

app.get('/viewFeedbacks', function (req, res) {
    feedback.find()
        .then(function (feedbacks) {                                           // fetching feedbacks from the db
            if (feedbacks) {
                res.send(feedbacks);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

});

app.post('/viewFeedbacks/:id', function (req, res) {

    feedback.remove({_id : req.params.id}, function(err) {                    // deleting a oarticular feedback
        if (!err) {
            res.send("success");
        }
        else {
            res.send("error");
        }
    });

});



app.post('/Feedbacks', function (req, res) {
    var feedback1 = new feedback({
        Name:  req.body.name,                                           // assigning data to the modeled schema
        Email: req.body.email,
        Phone: req.body.phone,
        message: req.body.message
    });
    feedback1.save(function(err, thor) {
        if (err){
            return res.send("error");
        }else{
            console.log('Feedback added');
            return res.send("success");
        }
    });
});


app.get('/Events/:address', function (req, res) {
    event.find({ "Location": { "$regex": req.params.address, "$options": "i" }})   //fetching events by location
        .then(function (events) {
            if (events) {
                res.send(events);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

});

app.post('/Events', function (req, res) {
    console.log(req);
    var eventObj = new event({
        Name: req.body.name,                                                         // assigning data to the modeled schema
        Location: req.body.location,
        Venue:  req.body.venue,
        Description: req.body.description,
        Timings: req.body.timings
    });
    eventObj.save(function(err) {
        if (err){
            return res.send("error");
        }else{
            console.log('events created');
            return res.send("success");
        }

    });
});
app.get('/Restaurants', function (req, res) {
    restaurant.find()
        .then(function (restaurants) {
            if (restaurants) {
                res.send(restaurants);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

});

app.get('/Restaurants/:address', function (req, res) {
    restaurant.find( { $or: [ { "Address": { "$regex": req.params.address, "$options": "i" } },{ "Location": { "$regex": req.params.address, "$options": "i" } }]})
        .then(function (restaurants) {
            if (restaurants) {
                res.send(restaurants);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

});

app.post('/Restaurants', function (req, res) {
    console.log(req);
    var restaurantObj = new restaurant({
        Name: req.body.name,
        Location: req.body.location,                                            // assigning data to the modeled schema
        Address:  req.body.address,
        Description: req.body.description,
        Timings: req.body.timings,
        Contact: req.body.contact
    });
    restaurantObj.save(function(err) {
        if (err){
            return res.send("error");
        }else{
            console.log('restauarant created');
            return res.send("success");
        }



    });
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
	
	//functionality for saving chat in database. Username and message are stored.
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

	//functionality for getting all previous chat from database
    socket.on('get All Chat', function(){
        chatMessage.find(function (err, chats) {
            if (err) return console.error(err);
            io.emit('get All Chat', chats);
        });
    });
	//functionality for displaying isTyping on public chat screen
    socket.on("typing", function(data) {
        io.emit("isTyping", data);
    });
	
	//when user disconnet or logged out , "disconnect" is called 
    socket.on("disconnect", function() {
        socket.leave(socket.room);
        console.log(socket.id + ' disconnected');
        var id = socket.id;
        for(var i = 0; i < listOfOnlinePeople.length; i++) {
            if(listOfOnlinePeople[i].socketId == id) {
                listOfOnlinePeople.splice(i, 1);
                io.emit("getOnlinePeople",{"listOfOnlinePeople" : listOfOnlinePeople});
                break;
            }
        }
    });
	//This function is called when user login into app
    socket.on("joinserver", function(data) {
        //console.log('disconnect');
        console.log(socket.id + " : "+data.uname);
        // if(!data.isVisited) {
        listOfOnlinePeople.push({"socketId": socket.id, "username": data.uname});
        // }
        io.emit("getOnlinePeople",{"listOfOnlinePeople" : listOfOnlinePeople});
    });
	//This function is called when user join into private chat window.
    socket.on('subscribe', function(data) {
        console.log('joining room', data.roomId);
        socket.room = data.roomId;
        socket.join(data.roomId);
        //rooms.push({"roomName" : data.roomId,"socketId": socket.id});
        var socketId;
        for(var i = 0; i < listOfOnlinePeople.length; i++) {
            if(listOfOnlinePeople[i].username == data.toUser) {
                socketId = listOfOnlinePeople[i].socketId;
                io.sockets.connected[socketId].emit('join room to chat', {"roomName" : data.roomId ,"fromUser" : data.name});
                //rooms.push({"roomName" : data.roomId,"socketId": socketId});
                break;
            }
        }

    });
	
	//This function is used for private chat 
    socket.on('add me in room', function(data) {
        socket.room = data.roomName;
        console.log("adding toUser");
        socket.join(data.roomName);
    });
	
	//This function is used for sending private messages
    socket.on('send private message', function(data) {
        var roomId  = data.room;
        console.log("room found");
        io.to(roomId).emit('conversation private post', {
            "message": data.message,
            "fromUser": data.name,
            "toUser": data.toUser
        });
    });

});

///////////////////////////////////////////////save contact form///////////////////////////////////////////////////


app.post('/contact', function (req, res) {
    console.log('testing2');
    var email = req.param('Email');
    console.log('guestname: ' + email);
    var subject = req.param('Subject');
    console.log('title: ' + subject);
    var msg = req.param('Message');
    console.log('desciption: ' + msg);

//save db
    var contact = new ContactForm({
        Email : email,
        Subject :subject,
        Message: msg



    });
    contact.save(function(err, thor) {
        if (err) return console.error(err);

        res.render('contact',{Message:'Thank you for contacting us...!'});

    });


});
///////////////////////////////////////////////save contact form///////////////////////////////////////////////////

app.post('/feedback', function (req, res) {

    var name = req.param('name');                                                      // assigning data to the modeled schema
    console.log('guestname: ' + name);
    var email = req.param('email');
    console.log('title: ' + email);
    var phone = req.param('phone');
    console.log('desciption: ' + phone);
    var message = req.param('message');
    console.log('desciption: ' + message);

//save db
    var feedback = new FeedbackForm({
        name : name,
        email :email,
        phone: phone,
        feedback:message
    });
    feedback.save(function(err, thor) {
        if (err) return console.error(err);

        res.render('feedback',{Message:'Thank you for giving us feedback...!'});

    });


});