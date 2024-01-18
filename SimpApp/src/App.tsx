import React, {useEffect} from 'react';
import './i18n/';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './context/AuthContext';
import {ThemeProvider} from './context/ThemeContext';
import NotificationService from './services/NotificationService';
import Layout from './components/common/Layout';

function App(): React.JSX.Element {
  // useEffect(() => {
  //   NotificationService.requestUserPermission();
  //   NotificationService.notificationListener();
  // }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
