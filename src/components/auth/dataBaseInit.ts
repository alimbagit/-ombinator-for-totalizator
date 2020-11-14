import firebase from "firebase";


export const dataBaseInit = () => {


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
