import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from 'axios';
import { API_URL, VAPID_KEY } from '../config/constants';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCGa0d_TgGVzFFOIJIQnBHzwOop1CdLsM",
  authDomain: "simple-app-mobile.firebaseapp.com",
  projectId: "simple-app-mobile",
  storageBucket: "simple-app-mobile.appspot.com",
  messagingSenderId: "431272548946",
  appId: "1:431272548946:web:8b054db41026f823e5dd8b"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

const requestForToken = async () => {
  return getToken(messaging, { vapidKey: VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
        return currentToken;
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        return '';
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

/**
 * Handles received message and displays a notification using Notifee.
 * @returns {Promise<MessagePayload>} A Promise that resolves when the notification is displayed.
 */
const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });

/**
* Sends a test push notification.
* @returns {Promise<void>} A Promise that resolves with after the success or failure of sending the test push.
*/
const sendTestMessage = async (): Promise<void> => {
  try {
    console.log('Sending Test push')
    const result = await axios.get(`${API_URL}/sendpush`);
    console.log('Test Push Response ->', JSON.stringify(result));
  } catch (e) {
    console.log((e).response.data.msg);
  }
};

const NotificationService = {
  requestForToken,
  onMessageListener,
  sendTestMessage,
};

export default NotificationService;
