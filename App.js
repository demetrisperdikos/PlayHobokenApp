import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen from './screens/HomeScreen';
import FriendsScreen from './screens/FriendsScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ProfileScreen from './screens/ProfileScreen';
import firebase from 'firebase/compat/app';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Text, View, Platform } from 'react-native';

// Check if Firebase was previously initialized
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp({
    // Your firebase configuration object
    apiKey: "AIzaSyAu9LaK2L4WFlq1JVesz5XTwwS82CXsjUw",
    authDomain: "playhobokenapp.firebaseapp.com",
    databaseURL: "https://playhobokenapp-default-rtdb.firebaseio.com",
    projectId: "playhobokenapp",
    storageBucket: "playhobokenapp.appspot.com",
    messagingSenderId: "800030455108",
    appId: "1:800030455108:web:060fa8ecd5f2b266e99311",
    measurementId: "G-5E91HVBDBL"
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="User" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeTabNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
      </Stack.Navigator>

      {notification && (
        <View style={{ position: 'absolute', top: 40, right: 0, left: 0 }}>
          <Text>Received notification:</Text>
          <Text>{notification.request.content.body}</Text>
        </View>
      )}
    </NavigationContainer>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    a
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'IOS') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default App;
