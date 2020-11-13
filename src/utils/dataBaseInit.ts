import firebase from "firebase";

// Set the configuration for your app
// TODO: Replace with your project's config object
export const dataBaseInit = () => {
  var config = {
    // apiKey: "apiKey",
    authDomain: "combinator-for-totalizator.firebaseapp.com",
    databaseURL: "https://combinator-for-totalizator.firebaseio.com",
    // storageBucket: "bucket.appspot.com",
  };
  firebase.initializeApp(config);

  firebase
    .database()
    .ref("users/")
    .once("value")
    .then((snapshot) => {
      console.log(snapshot.val());
    });

  var userListRef = firebase.database().ref("users/");
  userListRef.on("value", (snapshot) => {
    console.log(snapshot.val());
  });
};
