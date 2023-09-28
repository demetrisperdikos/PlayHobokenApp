const admin = require('firebase-admin');

// replace `your-service-account-file.json` with the path to your actual service account key file.
let serviceAccount = require('./playhobokenapp-firebase-adminsdk-imsak-873211e9ee.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

// List of users to add to the Firestore
let users = [
  { email: 'test@gmail.com', friends: [], friendRequests: [] },
  { email: 'user2@example.com', friends: [], friendRequests: [] },
  { email: 'user3@example.com', friends: [], friendRequests: [] },
  { email: 'user4@example.com', friends: [], friendRequests: [] },
  { email: 'user5@example.com', friends: [], friendRequests: [] }
];

// Function to add a user to Firestore
const addUser = async (user) => {
  try {
    await db.collection('users').doc(user.email).set(user, { merge: true });
    console.log(`User ${user.email} added successfully.`);
  } catch (error) {
    console.error(`Error adding user ${user.email}: `, error);
  }
};

// Add all users to Firestore
users.forEach(addUser);
