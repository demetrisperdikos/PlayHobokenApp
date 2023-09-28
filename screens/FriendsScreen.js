import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import styles from '../styles/FriendsStyles';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const FriendsScreen = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, [search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await firebase.firestore().collection('users')
        .orderBy('email')
        .startAt(search)
        .endAt(search + '\uf8ff')
        .get();
      setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      Alert.alert('Fetch Users Error', error.message);
    }
    setLoading(false);
  };
  

  const fetchCurrentUser = async () => {
    try {
      const snapshot = await firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.email)
        .get();
      setCurrentUser(snapshot.data());
    } catch (error) {
      Alert.alert('Fetch Current User Error', error.message);
    }
  };

  const sendFriendRequest = async (friendEmail) => {
    try {
      const friendRef = firebase.firestore().collection('users').doc(friendEmail);
      friendRef.update({
        friendRequests: firebase.firestore.FieldValue.arrayUnion({ from: firebase.auth().currentUser.email }),
      });
      Alert.alert('Friend Request Sent', `Friend request sent to ${friendEmail}`);
    } catch (error) {
      Alert.alert('Send Friend Request Error', error.message);
    }
  };

  const acceptFriendRequest = async (request) => {
    try {
      const currentUserRef = firebase.firestore().collection('users').doc(currentUser.email);
      currentUserRef.update({
        friendRequests: firebase.firestore.FieldValue.arrayRemove(request),
        friends: firebase.firestore.FieldValue.arrayUnion(request.from),
      });
      fetchCurrentUser();
    } catch (error) {
      Alert.alert('Accept Friend Request Error', error.message);
    }
  };

  const denyFriendRequest = async (request) => {
    try {
      const currentUserRef = firebase.firestore().collection('users').doc(currentUser.email);
      currentUserRef.update({
        friendRequests: firebase.firestore.FieldValue.arrayRemove(request),
      });
      fetchCurrentUser();
    } catch (error) {
      Alert.alert('Deny Friend Request Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={text => setSearch(text)}
      />
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.email}
          renderItem={({ item }) => (
            <View style={styles.user}>
              <Text style={styles.userEmail}>{item.email}</Text>
              <TouchableOpacity style={styles.button} onPress={() => sendFriendRequest(item.email)}>
                <Text style={styles.buttonText}>Send Friend Request</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <Text>Friend Requests:</Text>
      {currentUser?.friendRequests.map(request => (
        <View key={request.from}>
          <Text>{request.from}</Text>
          <TouchableOpacity onPress={() => acceptFriendRequest(request)}>
            <Text>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => denyFriendRequest(request)}>
            <Text>Deny</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default FriendsScreen;
