import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyANJIcmdUKtVXKMCI2TuS9ptk6KKPx2r2s",
    authDomain: "my-awesome-project-767e9.firebaseapp.com",
    databaseURL: "https://my-awesome-project-767e9.firebaseio.com",
    projectId: "my-awesome-project-767e9",
    storageBucket: "my-awesome-project-767e9.appspot.com",
    messagingSenderId: "280643198255",
    appId: "1:280643198255:web:f551908b9ac171500bd5da",
    measurementId: "G-QM0ZNZMRZ6"
};
  
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;
