const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mohamed1refaie:' + process.env.MONGO_ATLAS_PW + '@notifications-u3azq.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});

module.exports = mongoose;