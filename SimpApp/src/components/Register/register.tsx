import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Button,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import {TextInput} from 'react-native';
import {SUPPORTED_COUNTRIES} from '../../config/constants';
import DropDownPicker from 'react-native-dropdown-picker';
import {validateRegex} from '../../utils/validateRegex';
import NotificationService from '../../services/NotificationService';

export default function Register(props: RegisterProps): React.JSX.Element {
  const {navigation} = props;
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin, onRegister, isLoading} = useAuth();

  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState('');
  const [items, setItems] = useState(SUPPORTED_COUNTRIES);

  const [errorText, setErrorText] = useState('');

  const login = async (usrnm: string, pwd: string) => {
    const result = await onLogin!(usrnm, pwd);

    if (result && result.error) {
      Alert.alert('Error', result.msg);
    }
  };

  const register = async () => {
    if (country) {
      const validationRules = SUPPORTED_COUNTRIES.find(
        c => c.value === country,
      );

      if (validationRules) {
        const isValidUsername = validateRegex(
          username,
          validationRules.validations.patternMatch,
        );

        if (!isValidUsername) {
          setErrorText(validationRules.validations.errorText);
          return;
        }

        if (
          !validateRegex(
            email,
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
          )
        ) {
          setErrorText('Please enter a valid email');
          return;
        }

        if (!password) {
          setErrorText('Please enter a password');
          return;
        }

        const deviceToken = await NotificationService.getDeviceToken();
        const result = await onRegister!({
          country,
          username,
          email,
          password,
          deviceToken,
        });

        if (result && result.error) {
          Alert.alert('Error', result.msg);
        } else {
          login(username, password);
          navigation.goBack();
        }
      }
    } else {
      setErrorText('Please select a country');
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logintext}>Create an account</Text>
      <View style={styles.form}>
        <DropDownPicker
          open={open}
          value={country}
          items={items}
          setOpen={setOpen}
          setValue={setCountry}
          setItems={setItems}
          placeholder="Select your country"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#ccc"
          onChangeText={(text: string) => setUsername(text)}
          value={username}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#ccc"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholderTextColor="#ccc"
        />

        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : <></>}

        <Button onPress={register} title="Create an account" />
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Text style={styles.backBtn}>{'<  Back to Login'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logintext: {
    fontSize: 20,
    color: 'green',
    padding: 10,
  },
  form: {
    gap: 10,
    width: '70%',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    color: '#111',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    textAlign: 'center',
    color: '#1769aa',
  },
  errorText: {
    color: '#d50000',
  },
});
