import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, FlatList, Modal, Button, TextInput } from 'react-native';
import { Card } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const activities = [
  { id: '1', title: 'Billiards', img: require('../assets/billiards.jpg') },
  { id: '2', title: 'Boardgames', img: require('../assets/boardgames.jpg') },
  { id: '3', title: 'Dungeons & Dragons', img: require('../assets/dnd.jpg') },
  { id: '4', title: 'Magic The Gathering', img: require('../assets/draft.jpg') },
];

const ActivitiesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState('');

  const [currentActivity, setCurrentActivity] = useState(null);
  const [eventName, setEventName] = useState('');

  const handleActivityPress = (activity) => {
    setCurrentActivity(activity);
    setModalVisible(true);
  };

  const addActiveGame = (type) => {
    const db = firebase.firestore();
    db.collection('activeGames').add({
      activityId: currentActivity.id,
      title: eventName || currentActivity.title, // Use custom name if provided
      type: type,
      creatorId: firebase.auth().currentUser.uid,
      img: currentActivity.img,
    });
  };

  const handleStartActivity = () => {
    addActiveGame('activity');
    Alert.alert(`Started activity for ${eventName || currentActivity.title}`);
    setModalVisible(false);
    setEventName(''); // Clear event name
  };

  const handleStartTournament = () => {
    addActiveGame('tournament');
    Alert.alert(`Started tournament for ${eventName || currentActivity.title}`);
    setModalVisible(false);
    setEventName(''); // Clear event name
  };

  const renderActivity = ({ item }) => (
    <TouchableOpacity onPress={() => handleActivityPress(item)}>
      <View style={styles.item}>
        <Card>
          <Card.Cover source={item.img} style={styles.cardImage} resizeMode='cover' />
          <Card.Content>
            <Text style={styles.title}>{item.title}</Text>
          </Card.Content>
        </Card>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{currentActivity?.title}</Text>
            <TextInput
              placeholder="Enter Event Name"
              onChangeText={setEventName}
              value={eventName}
              style={styles.input}
            />
            <Button title='Start Activity' onPress={handleStartActivity} />
            <Button title='Start Tournament' onPress={handleStartTournament} />
            <TextInput placeholder='Event Name' onChangeText={setEventName} value={eventName} />
<TextInput placeholder='Max Players' keyboardType='numeric' onChangeText={setMaxPlayers} value={maxPlayers} />
<Button title='Close' onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardImage: {
    height: 150,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default ActivitiesScreen;
