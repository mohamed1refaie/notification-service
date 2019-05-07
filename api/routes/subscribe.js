const express = require('express');
const router = express.Router();

const subscribeController = require("../controllers/subscribe");

/*
    Post request that takes the user's info and saves
    the info.
    email : string,required,
    phoneNumber : string, required,
    token: (fcm token) string,required,
    userId: string,required
 */
router.post('/', subscribeController.subscribe);


/*
    Post request that takes the topic of the subscription
    in the params and ids in the body
    ids: string or array of strings, required
 */
router.post('/:topic', subscribeController.subscribe_to_topic);


module.exports = router;