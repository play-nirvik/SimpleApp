/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import NotificationService from './src/services/NotificationService';

AppRegistry.registerComponent(appName, () => App);

NotificationService.setup();
