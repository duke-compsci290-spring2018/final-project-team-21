import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCer-ja4FYfPjI2xtauwcedyZ5GucqzDoc",
    authDomain: "charitability-94e58.firebaseapp.com",
    databaseURL: "https://charitability-94e58.firebaseio.com",
    projectId: "charitability-94e58",
    storageBucket: "charitability-94e58.appspot.com",
    messagingSenderId: "319350461000"
};
var fbApp = firebase.initializeApp(config);

// global reference to remote database app
export const db = fbApp.database()
// global reference to remote storage
export const storageRef = fbApp.storage().ref()
// create useful endpoints within the database
export const dataRef = db.ref('data')//creating data storage in firebase
export const donationsRef = db.ref('donations')//creating donations storage
export const reviewsRef = db.ref('reviews')//creating reviews storage in firebase