let admin = require("firebase-admin");

let serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://notificationsdemoapp-a1f6a.firebaseio.com"
});


module.exports = admin;