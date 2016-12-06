var mongoose = require('mongoose');
var hotelSchema = new mongoose.Schema({
    Name : { type: String },
    Location : { type: String }/*,
 Address: { type: String },
 Description : { type: String },
 Rating : { type: String },
 pricePerDay : { type: String }*/
 });


var Hotel = mongoose.model('hotel', hotelSchema);

// make this available to our users in our Node applications
module.exports = Hotel;