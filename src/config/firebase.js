import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAscWvl5Q_cDTY8tCWPo0FlcpEFW3EcyA0",
    authDomain: "meetingapp-4e75e.firebaseapp.com",
    databaseURL: "https://meetingapp-4e75e.firebaseio.com",
    projectId: "meetingapp-4e75e",
    storageBucket: "meetingapp-4e75e.appspot.com",
    messagingSenderId: "1031832967799"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
