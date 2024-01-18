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

export default function Login(props: LoginProps): React.JSX.Element {
  const {navigation} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin, isLoading} = useAuth();

  const login = async () => {
    const result = await onLogin!(username.trim(), password);

    console.log('login>>>', result);

    if (result && result.error) {
      Alert.alert('Error', result.msg);
    }
  };

  const register = () => {
    navigation.navigate('Register');
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logintext}>Application Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#ccc"
          onChangeText={(text: string) => setUsername(text)}
          value={username}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholderTextColor="#ccc"
        />

        <Button onPress={login} title="Sign In" />
        <Pressable onPress={register} hitSlop={8}>
          <Text style={styles.registerBtn}>Create an account</Text>
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
  registerBtn: {
    textAlign: 'center',
    color: '#1769aa',
  },
});
