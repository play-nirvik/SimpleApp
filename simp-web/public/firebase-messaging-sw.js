/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyDCGa0d_TgGVzFFOIJIQnBHzwOop1CdLsM',
  authDomain: 'simple-app-mobile.firebaseapp.com',
  projectId: 'simple-app-mobile',
  storageBucket: 'simple-app-mobile.appspot.com',
  messagingSenderId: '431272548946',
  appId: '1:431272548946:web:8b054db41026f823e5dd8b',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Test Push Notification';
  const notificationOptions = {
    body: 'This is a test push notification',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
