const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    Name:{type: String},
    Email: { type: String},
    Customer_Balance :{type: Number},
    Gender: {type: String},
    Customer_Id : {type: Number}
})

const Customers = mongoose.model('Customers_Details', CustomerSchema);
module.exports = Customers;