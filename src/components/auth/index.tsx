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
    //настройка параметров firebase auth
    firebase.auth().languageCode = "ru";
    firebase.auth().useDeviceLanguage();
    //запуск firebaseui
    auth.AuthUI.getInstance()?.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <AuthWrapper>
      <div id="firebaseui-auth-container"></div>
      <div id="loader"></div>
    </AuthWrapper>
  );
};

export default Auth;
