# Notification Server

This is a Notification server build with [nodejs](https://nodejs.org/en/), it uses [express](https://expressjs.com/), [mongoose](https://mongoosejs.com/) and [firebase-admin sdk](https://firebase.google.com/docs/admin/setup) to send notifications. The Server let you 
1. subscribe a user to the notifications and subscribe a user to a certain topic. 
2. send notification to all the subscribed users, to a specific user or users, to a group of users with a common topic. 
3. send sms to all the subscribed users and to a specific user or users. (you have to integrate with an sms provider)
4. refresh a certain user's firebase token.

## Instructions

To Run the Project:
* clone the repo or download it
* cd into the directory of the project from the terminal
* install all project dependencies with `npm install`
* head to the [Firebase console](https://console.firebase.google.com/u/0/)
* create a new project from the firebase console and give it a name, or select an existing project.
* go to your project's settings, then to service accounts, then generate new private key and download it.
* rename `serviceAccountKey.json.example` to `serviceAccountKey.json`
* copy the content of the private key file you just downloaded into `serviceAccountKey.json`
* configure your mongo database in `mongoose.js` in my case i use a free cluster at [Mongo Atlas](https://www.mongodb.com/cloud/atlas), and it's password will be in `nodemon.json.example` then rename it to `nodemon.json`
* run the project with `npm start` and it will be listening at localhost:3000
* test the project with `npm test`

***To Run the Project with docker:***
* make sure that docker and docker-compose are installed.
* run `sudo docker-compose up` it will be listening at localhost:3000

The API contains 8 endpoints 
**You can see a full documentation for the api and examples from [here](https://documenter.getpostman.com/view/3845720/S1Lwy7kT)**

  1. /subscribe
     * /
     * /:topic
  2. /notifications
     * /
     * /notifications/toAll
     * /notifications/toGroup
  3. /sms
     * /
     * /toAll
  4. /refreshToken
  


