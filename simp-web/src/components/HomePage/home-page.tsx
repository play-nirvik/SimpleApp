import { SUPPORTED_LANGUAGES } from '../../config/constants';
import { useTheme } from '../../context/ThemeContext';
import UserService from '../../services/UserService';
import './home-page.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NotificationService from '../../services/NotificationService';
import toast, { Toaster } from 'react-hot-toast';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { bgColor, textColor } = useTheme();
  const { t, i18n } = useTranslation();

  const [displayName, setDisplayName] = useState('');
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const userInfo = UserService.get();
    if (!userInfo || userInfo === undefined) {
      navigate('/');
    } else {
      setDisplayName(userInfo?.username);
    }
  }, [navigate]);

  NotificationService.onMessageListener()
    .then((payload) => {
      if (payload) {
        toast(t('push.content'));
      }
    })
    .catch((err) => console.log('failed: ', err));

  useEffect(() => {
    NotificationService.requestForToken();
  }, []);

  const changeLanguage = useCallback(
    (value: string) => {
      i18n
        .changeLanguage(value)
        .then(() => setLanguage(value))
        .catch((err) => console.log(err));
      console.log(value);
    },
    [i18n]
  );

  useEffect(() => {
    changeLanguage(language);
  }, [changeLanguage, language]);

  return (
    <>
      <Toaster />

      <div className='body-content' style={{ backgroundColor: bgColor }}>
        <p className='body-text' style={{ color: textColor }}>
          {t('greeting')}, {displayName}
        </p>

        <div>
          <button onClick={NotificationService.sendTestMessage}>{t('push.title')}</button>
        </div>

        <div className='langSelector'>
          <label>
            <span className='formlabel'>Select a language:</span>
            <select onChange={(e) => setLanguage(e.target.value)} className='fieldselect' defaultValue={language}>
              {SUPPORTED_LANGUAGES.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </div>
    </>
  );
};

export default HomePage;
