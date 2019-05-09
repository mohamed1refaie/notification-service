const User = require('../models/user');


/*
    send_sms function receives the phoneNumbers and
    the message and returns a promise
    TODO: INTEGRATE WITH A REAL SMS PROVIDER
 */
let send_sms = (phoneNumbers, message) => {

    return new Promise(function (resolve, reject) {
        // integrate with an sms provider
        resolve({message: "success"});

    })

};


/*
    send_sms_to_all function sends sms to all users,
    it extracts the message from the request body,
    gets the phone numbers for all users,
    divide the phone numbers in loads that sms provider
    can handle in one minute, iterate over the loads and
    send sms to each load, wait a minute and send again.
 */
exports.send_sms_to_all = (req, res, next) => {

    const msg = req.body.message;
    if (msg === undefined || msg === "") {
        res.status(400).json({error: "message is required"})
    } else {
        User.find().exec().then(users => {

            let phoneNumbers = users.map((user) => {
                return user.phoneNumber;
            });

            if (phoneNumbers.length > 0) {
                let returnJson = [];
                let statusCode = 200;
                let maximumCapacity = 1000;
                let noOfLoads = phoneNumbers.length / maximumCapacity;
                if (phoneNumbers.length % maximumCapacity !== 0) {
                    noOfLoads++;
                }
                noOfLoads = Math.floor(noOfLoads);

                for (let i = 0; i < noOfLoads; i++) {
                    let start = i * maximumCapacity, end = (i + 1) * maximumCapacity;
                    let batchPhoneNumbers = phoneNumbers.slice(start, end);
                    send_sms(batchPhoneNumbers, msg).then(jsonObj => {
                        returnJson.push({loadNumber: i + 1, success: jsonObj});
                        if (i + 1 === noOfLoads) {
                            res.status(statusCode).json(returnJson);
                        }
                    }).catch(error => {
                        returnJson.push({loadNumber: i + 1, error: error});
                        statusCode = 500;

                        if (i + 1 === noOfLoads) {
                            res.status(statusCode).json(returnJson);
                        }
                    });

                    setTimeout(() => {

                    }, 60000);

                }
            } else {
                res.status(200).json({message: "no phone numbers to send to"})
            }


        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
    }
};


/*
    send_sms_to_specific function sends sms to a specific
    user or users, it extracts the message and ids from
    the request body, get the phone numbers associated
    with those ids then send sms to them
 */
exports.send_sms_to_specific = (req, res, next) => {
    const msg = req.body.message;
    const Ids = req.body.ids;

    if (msg === undefined || msg === "" || Ids === undefined) {
        res.status(400).json({error: "message and ids are required"});
    } else {
        User.find({'userId': Ids}).select('phoneNumber -_id').then(users => {
            let phoneNumbers = users.map((user) => {
                return user.phoneNumber;
            });

            if (phoneNumbers.length > 0) {
                send_sms(phoneNumbers, msg).then(jsonObj => {
                    res.status(200).json(jsonObj);
                }).catch(error => {
                    res.status(500).json(error);
                })
            } else {
                res.status(200).json({message: "No valid ids"});
            }

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
    }
};