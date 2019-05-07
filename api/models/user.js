const mongoose = require('mongoose');

/*
    _id : mongoose primary key
    token : (the firebase cloud messaging -fcm- token)
    phoneNumber : the user's phone number
    userdId : the user's Id in the original Database (foreign key)
    email : the user's email

 */
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    userId: {type: String, required: true},
    email: String
});

module.exports = mongoose.model('User', userSchema);