const express = require('express');
const router = express.Router();

const RefreshTokenController = require('../controllers/refreshToken');

/*
    PUT Request that takes id and the new token for the user
    id: string ,required,
    token: string, required
 */
router.put('/', RefreshTokenController.refresh_user_token);


module.exports = router;