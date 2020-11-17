import React, { useEffect } from "react";
import { auth } from "firebaseui";
import firebase from "firebase";
import { AuthWrapper } from "./elements";

const Auth = () => {
  useEffect(() => {
    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      tosUrl: "<your-tos-url>",
    };
    firebase.auth().languageCode = "ru";
    firebase.auth().useDeviceLanguage();
    auth.AuthUI.getInstance()?.start("#firebaseui-auth-container", uiConfig);
  }, []);

  /**Событие ответа сервера авторизации */
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("user=", user.displayName, user.email);
    } else {
      console.log("Авторизация не произошла!");
    }
  });

  return (
    <AuthWrapper>
      <div id="firebaseui-auth-container"></div>
      <div id="loader"></div>
    </AuthWrapper>
  );
};

export default Auth;
