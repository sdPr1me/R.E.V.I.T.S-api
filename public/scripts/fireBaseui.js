var app_fireBase = {};

(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDcH_QlmA8PT94zFZD-9cjn380BbI7F6Y8",
        authDomain: "ticketchecker-d4f79.firebaseapp.com",
        databaseURL: "https://ticketchecker-d4f79.firebaseio.com",
        projectId: "ticketchecker-d4f79",
        storageBucket: "ticketchecker-d4f79.appspot.com",
        messagingSenderId: "224378918645"
    };
    firebase.initializeApp(config);

    app_fireBase = firebase;
})()