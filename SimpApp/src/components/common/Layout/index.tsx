import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useAuth} from '../../../context/AuthContext';
import HomePage from '../../HomePage/home-page';
import Login from '../../Login/login';
import Register from '../../Register/register';
import HeaderRight from '../Header/header-right';
import {createStackNavigator} from '@react-navigation/stack';

const headerRightOptions = {
  headerRight: () => <HeaderRight />,
};

const Stack = createStackNavigator();

const Layout = () => {
  const {authState} = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={headerRightOptions}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
