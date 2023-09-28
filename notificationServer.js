var admin = require("firebase-admin");

var serviceAccount = require("./playhobokenapp-firebase-adminsdk-imsak-873211e9ee.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const message = {
  data: {
    score: '850',
    time: '2:45',
  },
  topic: 'general',
};

// Send a message to devices subscribed to the provided topic.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
