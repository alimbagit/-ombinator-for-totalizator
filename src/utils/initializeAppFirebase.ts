import firebase from "firebase";
import { auth } from "firebaseui";

const initializeAppFireBase = () => {
  //Инициализация firebase
  const firebaseConfig = {
    apiKey: "AIzaSyABNeNifZwR4EqzLcGenrAIazGeL-sW4C8",
    authDomain: "combinator-for-totalizator.firebaseapp.com",
    databaseURL: "https://combinator-for-totalizator.firebaseio.com",
    projectId: "combinator-for-totalizator",
    storageBucket: "combinator-for-totalizator.appspot.com",
    messagingSenderId: "398044821860",
    appId: "1:398044821860:web:9a7ef96bb5f32fa4e8e271",
    measurementId: "G-GZ3Q1PZZW0",
  };
  firebase.initializeApp(firebaseConfig);

  //Инициализация firebaseui
  //   var uiConfig = {
  //     signInSuccessUrl: "/",
  //     signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  //     tosUrl: "<your-tos-url>",
  //   };
  new auth.AuthUI(firebase.auth());
};

export default initializeAppFireBase;
