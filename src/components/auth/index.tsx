import React, { useEffect } from 'react';
import { auth } from 'firebaseui';
import firebase from 'firebase';

const Auth = () => {
    useEffect(() => {
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyABNeNifZwR4EqzLcGenrAIazGeL-sW4C8",
            authDomain: "combinator-for-totalizator.firebaseapp.com",
            databaseURL: "https://combinator-for-totalizator.firebaseio.com",
            projectId: "combinator-for-totalizator",
            storageBucket: "combinator-for-totalizator.appspot.com",
            messagingSenderId: "398044821860",
            appId: "1:398044821860:web:9a7ef96bb5f32fa4e8e271",
            measurementId: "G-GZ3Q1PZZW0"
        };
        firebase.initializeApp(firebaseConfig);
        
        var uiConfig = {
            signInSuccessUrl: 'index.html',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>',
            // Privacy policy url.
            // privacyPolicyUrl: '<your-privacy-policy-url>'
        };
        var ui = new auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);


        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("user=", user.displayName, user.email)
            }
            else {
                console.log("Авторизация не произошла!");
            }
        })

    }, [])



    return (
        <div>
            <div id="firebaseui-auth-container">

            </div>
            <div id="loader"></div>
        </div>

    )
}

export default Auth;