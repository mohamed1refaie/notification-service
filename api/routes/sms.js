const express = require('express');
const router = express.Router();
const SMSController = require('../controllers/sms');

/*
    Post request that sends SMS to all users,
    It takes message in the request body.
    message : string, required
 */
router.post('/toAll', SMSController.send_sms_to_all);


/*
    Post request that sends SMS to a specific user or users,
    It takes message and ids in the request body.
    message: string, required
    ids: string or array of strings, required
 */
router.post('/', SMSController.send_sms_to_specific);

module.exports = router;