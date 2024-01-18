import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {API_URL} from '../config/constants';
import {useTheme} from './ThemeContext';
import UserService from '../services/UserService';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    username: string | null;
  }>({token: null, authenticated: null, username: null});

  const {setTheme} = useTheme();

  useEffect(() => {
    const loadToken = async () => {
      const userInfo: UserInfo | undefined = await UserService.get();

      if (userInfo?.token) {
        setAuthState({
          token: userInfo?.token,
          authenticated: true,
          username: userInfo?.username,
        });
      }
      setIsLoading(false);
    };

    loadToken();
  }, []);

  const registerHandler = async (userData: UserProps) => {
    try {
      const result = await axios.post(`${API_URL}/register`, userData);

      return result;
    } catch (e) {
      return {error: true, message: (e as any).response.data.message};
    }
  };

  const loginHandler = async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/login`, {username, password});

      setAuthState({
        token: result.data.token,
        authenticated: true,
        username: result.data.username,
      });

      UserService.set(result.data);
      await EncryptedStorage.setItem('theme', result.data.country);
      setTheme(result.data.country);

      return result;
    } catch (e) {
      console.log((e as any).response.data.message);
      return {error: true, msg: (e as any).response.data.message};
    }
  };

  const logoutHandler = async () => {
    UserService.delete();
    await EncryptedStorage.removeItem('theme');

    setAuthState({
      token: null,
      authenticated: false,
      username: null,
    });
  };

  const value = {
    onRegister: registerHandler,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    authState,
    isLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
