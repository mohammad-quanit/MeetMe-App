import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAiVBj3s1rlQRQMWIR24RMii0qLNQvmGm8",
  authDomain: "meet-up-app-2a2cf.firebaseapp.com",
  databaseURL: "https://meet-up-app-2a2cf.firebaseio.com",
  projectId: "meet-up-app-2a2cf",
  storageBucket: "meet-up-app-2a2cf.appspot.com",
  messagingSenderId: "359978912447"
};
firebase.initializeApp(firebaseConfig);

export default firebase;


// apiKey: "AIzaSyAscWvl5Q_cDTY8tCWPo0FlcpEFW3EcyA0",
//     authDomain: "meetingapp-4e75e.firebaseapp.com",
//     databaseURL: "https://meetingapp-4e75e.firebaseio.com",
//     projectId: "meetingapp-4e75e",
//     storageBucket: "meetingapp-4e75e.appspot.com",
//     messagingSenderId: "1031832967799"