import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import {useAuth} from '../../../context/AuthContext';

export default function HeaderRight(): React.JSX.Element {
  const {onLogout} = useAuth();

  return (
    <Pressable onPress={onLogout} style={styles.headerRight}>
      <Text style={styles.signOutBtn}>Sign Out</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 10,
  },
  signOutBtn: {
    textAlign: 'center',
    color: '#1769aa',
  },
});
