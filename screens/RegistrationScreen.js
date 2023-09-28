import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, FlatList, Switch } from 'react-native';
import styles from '../styles/RegistrationStyles'; 
import logo from '../assets/Logo.png'; 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const activities = [
  { id: '1', title: 'Billiards'},
  { id: '2', title: 'Boardgames'},
  { id: '3', title: 'Ping Pong'},
  { id: '4', title: 'Arcade'},
  { id: '5', title: 'Esports'},
  { id: '6', title: 'Golf'},
  { id: '7', title: 'Commander'},
  { id: '8', title: 'Dungeons & Dragons'},
  { id: '9', title: 'Darts'},
];

const ActivityItem = ({ activity, onToggle }) => (
  <View style={styles.activityContainer}>
    <Text>{activity.title}</Text>
    <Switch
      value={activity.selected}
      onValueChange={onToggle}
    />
  </View>
);

const RegistrationScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedActivities, setSelectedActivities] = useState(
    activities.reduce((prev, curr) => ({ ...prev, [curr.title]: false }), {})
  );

  const toggleSwitch = (activityTitle) => {
    setSelectedActivities(prev => ({ ...prev, [activityTitle]: !prev[activityTitle] }));
  };

  const register = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const selectedActivityTitles = Object.entries(selectedActivities)
          .filter(([title, isSelected]) => isSelected)
          .map(([title, isSelected]) => title);

        firebase.firestore().collection('users').doc(user.email).set({
          fullName,
          email: user.email,
          friends: [],
          friendRequests: [],
          activities: selectedActivityTitles,
        })

        navigation.navigate('Home');
      })
      .catch((error) => {
        setErrorMessage(error.message);
        Alert.alert('Register Error', error.message);
      });
  };

  const activityData = activities.map(activity => ({
    ...activity,
    selected: selectedActivities[activity.title]
  }));

  return (
    <View style={styles.container}>
      <Image
        source={logo}  
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#a8a8a7" 
        onChangeText={text => setFullName(text)}
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
      <Text style={styles.activityText}>Select your activities:</Text>
      <FlatList
        data={activityData}
        renderItem={({ item: activity }) => 
          <ActivityItem activity={activity} onToggle={() => toggleSwitch(activity.title)} />
        }
        keyExtractor={activity => activity.id}
        numColumns={3}
      />
      <TouchableOpacity style={styles.registerButton} onPress={register}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButtonText}>Go to Login</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </View>
  );
};


export default RegistrationScreen;
