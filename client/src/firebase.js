 import * as firebase from 'firebase'
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyB8zvFUL6lc5fqFTYlQsRVgRCni0Pp_5j0",
    authDomain: "ecommerce-27a0c.firebaseapp.com",
    projectId: "ecommerce-27a0c",
    storageBucket: "ecommerce-27a0c.appspot.com",
    messagingSenderId: "640704064370",
    appId: "1:640704064370:web:38f63f24f09ead2ac74beb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth=firebase.auth();
  export const googleAuthProvier=new firebase.auth.GoogleAuthProvier();