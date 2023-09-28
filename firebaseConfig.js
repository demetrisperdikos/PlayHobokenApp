import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAu9LaK2L4WFlq1JVesz5XTwwS82CXsjUw",
    authDomain: "playhobokenapp.firebaseapp.com",
    databaseURL: "https://playhobokenapp-default-rtdb.firebaseio.com",
    projectId: "playhobokenapp",
    storageBucket: "playhobokenapp.appspot.com",
    messagingSenderId: "800030455108",
    appId: "1:800030455108:web:060fa8ecd5f2b266e99311",
    measurementId: "G-5E91HVBDBL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); 
}

export default firebase;
