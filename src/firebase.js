import firebase  from "firebase";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "xx-xxxx--x-x-x-Change--It--With--yours",
  authDomain: "real-estate-pro-55476.firebaseapp.com",
  projectId: "real-estate-pro-55476",
  storageBucket: "real-estate-pro-55476.appspot.com",
  messagingSenderId: "kkrkrekrk",
  appId: "1:xvcweewe:web:kkerkerke"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export const storageRef = firebase.storage();

export default firebase.database();