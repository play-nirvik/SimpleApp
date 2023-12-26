/* eslint-disable prettier/prettier */
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import axios from 'axios';
import { API_URL } from '../config/constants';
import { t } from 'i18next';

/**
 * Sets up background message handler and message listener for Firebase Cloud Messaging.
 * @returns {void}
 */
const setup = (): void => {
  messaging().setBackgroundMessageHandler(onMessageReceived);
  messaging().onMessage(onMessageReceived);
};

/**
 * Registers notification listener for Firebase Cloud Messaging.
 * @returns {void}
 */
const notificationListener = (): void => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

/**
 * Fetches the device token for sending push notifications.
 * @returns {Promise<string>} A Promise that resolves with the device token.
 */
const getDeviceToken = async (): Promise<string> => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('DEVICE TOKEN:', token);
  return token;
};

/**
 * Requests user permission for receiving push notifications.
 * @returns {Promise<void>} A Promise that resolves when the permission is requested.
 */
const requestUserPermission = async (): Promise<void> => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

/**
 * Handles received message and displays a notification using Notifee.
 * @returns {Promise<void>} A Promise that resolves when the notification is displayed.
 */
const onMessageReceived = async (): Promise<void> => {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: t('push.title'),
    body: t('push.content'),
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
};

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
    console.log((e as any).response.data.msg);
  }
};

/**
 * NotificationService provides methods for setting up FCM, handling notifications, and sending test pushes.
 * @property {Function} setup - Sets up background message handler and message listener.
 * @property {Function} notificationListener - Registers notification listener.
 * @property {Function} getDeviceToken - Fetches the device token for sending push notifications.
 * @property {Function} requestUserPermission - Requests user permission for receiving push notifications.
 * @property {Function} onMessageReceived - Handles received message and displays a notification.
 * @property {Function} sendTestMessage - Sends a test push notification.
 */
const NotificationService = {
  setup,
  requestUserPermission,
  getDeviceToken,
  notificationListener,
  onMessageReceived,
  sendTestMessage,
};

export default NotificationService;
