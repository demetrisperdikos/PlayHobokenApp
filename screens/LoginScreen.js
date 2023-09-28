import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import styles from '../styles/LoginStyles';
import logo from '../assets/Logo.png'; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Alert.alert('Login Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={logo}  
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#a8a8a7" 
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#a8a8a7" 
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerButtonText}>Go to Register</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </View>
  );
};

export default LoginScreen;
