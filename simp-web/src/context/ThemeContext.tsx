/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import secureLocalStorage from 'react-secure-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext<ThemeProps>({});

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<string | null | undefined>('default');

  useEffect(() => {
    const themeCountry = secureLocalStorage.getItem('theme') as string;

    if (themeCountry) {
      setTheme(themeCountry);
    }
  }, []);

  const bgColorMap = () => {
    let bgColor = 'transparent';
    switch (theme) {
      case 'ae':
        bgColor = '#81c784';
        break;

      case 'in':
        bgColor = '#64b5f6';
        break;

      case 'fr':
        bgColor = '#7986cb';
        break;

      case 'es':
        bgColor = '#e57373';
        break;

      default:
        bgColor = 'transparent';
        break;
    }
    return bgColor;
  };

  const textColorMap = () => {
    let textColor = '#111';
    switch (theme) {
      case 'ae':
        textColor = '#f1f8e9';
        break;

      case 'in':
        textColor = '#e1f5fe';
        break;

      case 'fr':
        textColor = '#e8eaf6';
        break;

      case 'es':
        textColor = '#ffebee';
        break;

      default:
        textColor = '#111';
        break;
    }
    return textColor;
  };

  const updateHandler = async () => {
    const themeCountry = secureLocalStorage.getItem('theme') as string;

    setTheme(themeCountry);
  };

  const value = {
    onUpdate: updateHandler,
    bgColor: bgColorMap(),
    textColor: textColorMap(),
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
