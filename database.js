const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://admin_ride_app:admin_ride_app@cluster0.jnq6qri.mongodb.net/?retryWrites=true&w=majority";

// connect with mongodb

mongoose.connect(mongoURL);
module.exports = mongoose;