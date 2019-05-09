const User = require('../models/user');
const admin = require('../../firebase');
const mongoose = require('mongoose');

/*
    subscribe function extracts the user's info
    from the request body ,creates a new user
    and try to save the user in the database
 */
exports.subscribe = (req, res, next) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        token: req.body.token,
        phoneNumber: req.body.phoneNumber,
        userId: req.body.userId,
        email: req.body.email
    });

    user.save().then(result => {
        res.status(201).json(result)
    }).catch(err => {
            res.status(401).json(err);
        }
    );

};


/*
    subscribe_to_topic function extracts the topic of subscription
    from request params , the Ids string or array of strings from
    request body. Then find the users with those Ids, get their
    tokens and subscribe the tokens to the topic
 */
exports.subscribe_to_topic = (req, res, next) => {
    const topic = req.params.topic;
    const Ids = req.body.ids;
    if (Ids === undefined || Ids === "") {
        res.status(400).json({error: "ids field is required"});
    }
    User.find({'userId': Ids}).select('token -_id').then(users => {
        let tokens = users.map((user) => {
            return user.token;
        });
        if (tokens.length > 0) {
            admin.messaging().subscribeToTopic(tokens, topic)
                .then(function (response) {
                    res.status(200).json(response);
                })
                .catch(function (error) {
                    res.status(500).json(error);
                });
        } else {
            res.status(400).json({error: "not valid Ids"});
        }

    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });

};