var functions = require('firebase-functions');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })
//import admin module
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// Listens for new messages added to messages/:pushId
exports.pushNotification = functions.database.ref('/messages/{pushId}').onWrite( event => {

        console.log('Push notification event triggered');

//  Grab the current value of what was written to the Realtime Database.
var valueObject = event.data.val();



// Create a notification
const payload = {
    notification: {
        title:valueObject.name,
        body: valueObject.text,
        sound: "default"
    },
};

//Create an options object that contains the time to live for the notification and the priority
const options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};


return admin.messaging().sendToTopic("pushNotifications", payload, options);
});