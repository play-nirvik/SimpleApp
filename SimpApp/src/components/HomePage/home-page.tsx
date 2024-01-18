import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SUPPORTED_LANGUAGES} from '../../config/constants';
import DropDownPicker from 'react-native-dropdown-picker';
import {useTheme} from '../../context/ThemeContext';
import NotificationService from '../../services/NotificationService';
import {useAuth} from '../../context/AuthContext';

export default function HomePage(): React.JSX.Element {
  const {t, i18n} = useTranslation();
  const {bgColor, textColor} = useTheme();
  const {authState} = useAuth();

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<string>('en');
  const [items, setItems] = useState(SUPPORTED_LANGUAGES);

  const changeLanguage = useCallback(
    (value: string) => {
      i18n
        .changeLanguage(value)
        .then(() => setLanguage(value))
        .catch(err => console.log(err));
    },
    [i18n],
  );

  useEffect(() => {
    changeLanguage(language);
  }, [changeLanguage, language]);

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Text style={[styles.styledText, {color: textColor}]}>
        {t('greeting')}, {authState?.username}
      </Text>

      <Pressable
        onPress={NotificationService.sendTestMessage}
        style={styles.pushButton}
        hitSlop={10}>
        <Text>{t('push.title')}</Text>
      </Pressable>

      <DropDownPicker
        open={open}
        value={language}
        items={items}
        setOpen={setOpen}
        setValue={setLanguage}
        setItems={setItems}
        style={styles.languageDropdown}
        listMode="MODAL"
        testID="languageDropdownButton"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styledText: {
    flex: 1,
    fontSize: 40,
    color: 'green',
    padding: 20,
  },
  pushButton: {
    position: 'absolute',
    top: '20%',
    left: 20,
  },
  languageDropdown: {
    width: '40%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
    flexDirection: 'row',
    verticalAlign: 'middle',
  },
});
