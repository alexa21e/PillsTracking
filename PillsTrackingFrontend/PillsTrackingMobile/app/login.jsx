import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { login } from './api/login.js';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePress = async () => {
      const data = await login(phoneNumber);
      if (data === true) {
        navigation.navigate('home');
      }
      else {
        console.error('Error logging in');
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input}
        onChangeText={setPhoneNumber} value={phoneNumber}
        placeholder="Enter phone number">
      </TextInput>   
      <Text style={styles.p}>Enter the phone number you are affiliated with at your doctor's office</Text>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>)
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  p:{
      color: '#333',
      textAlign: 'center',
      marginLeft: 40,
      marginRight: 40,
    },
    input: {
      height: 40,
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Login