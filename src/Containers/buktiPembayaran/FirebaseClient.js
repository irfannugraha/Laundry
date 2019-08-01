const firebase = require('firebase')

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBnN2dJVRucHmMuyV4MPybhehTR7vo4_74",
  authDomain: "laundry-69.firebaseapp.com",
  databaseURL: "https://laundry-69.firebaseio.com",
  projectId: "laundry-69",
  storageBucket: "",
  messagingSenderId: "80891738612",
  appId: "1:80891738612:web:e852eac34519ce37"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp