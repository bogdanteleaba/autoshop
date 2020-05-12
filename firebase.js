import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

  var firebaseConfig = {
    apiKey: "AIzaSyAggLlVYrUML297YEo3wQXiCZU6JHjJoeA",
    authDomain: "autoshop-f3e1a.firebaseapp.com",
    databaseURL: "https://autoshop-f3e1a.firebaseio.com",
    projectId: "autoshop-f3e1a",
    storageBucket: "autoshop-f3e1a.appspot.com",
    messagingSenderId: "14230853465",
    appId: "1:14230853465:web:a5f0c3badcd4ee986d5e48",
    measurementId: "G-XM9QQ8XFWK"
  };
  // Initialize Firebase
  export const fb = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const dbMenuAdd = db.collection('menuItems');
export const dbOrders = db.collection('orderItems');