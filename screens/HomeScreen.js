import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Linking, Modal, Button } from 'react-native';
import { Card } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const events = [
  { id: '1', title: 'Pokemon Swap Meet', img: require('../assets/pokemon.jpeg'), url: 'https://playhoboken.com/pokemon/' },
  { id: '2', title: 'Friday Night Magic', img: require('../assets/draft.jpg'), url: 'https://playhoboken.com/mtg/' },
  // ... Other events ...
];

const HomeScreen = () => {
  const [activeGames, setActiveGames] = useState([]);
  const [showPlayersModal, setShowPlayersModal] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection('activeGames').onSnapshot((snapshot) => {
      const games = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, creatorId: data.creatorId, title: data.title, type: data.type, img: data.img, maxPlayers: data.maxPlayers, playerIds: data.players || [] };
      });
      setActiveGames(games);
    });
    return () => unsubscribe();
  }, []);

  const joinGame = async () => {
    const db = firebase.firestore();
    const gameRef = db.collection('activeGames').doc(currentGame.id);
    await gameRef.update({
      players: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
    });
    
    setShowPlayersModal(false);
  };

  const handleShowPlayers = (game) => {
    setCurrentGame(game);
    setShowPlayersModal(true);
  };

  const renderEvent = ({ item }) => (
    <TouchableOpacity onPress={() => item.url && item.url.trim() !== '' && Linking.openURL(item.url)}>
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

  const renderActiveGame = ({ item }) => (
    <TouchableOpacity onPress={() => handleShowPlayers(item)}>
      <View style={styles.item}>
        <Card>
          <Card.Cover source={item.img} style={styles.cardImage} resizeMode='cover' />
          <Card.Content>
            <Text style={styles.title}>{item.title} ({item.type})</Text>
          </Card.Content>
        </Card>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Events</Text>
      <FlatList
        horizontal
        data={events}
        renderItem={renderEvent}
        keyExtractor={item => item.id}
      />
      <Text style={styles.header}>Active Games</Text>
      <FlatList
        horizontal
        data={activeGames}
        renderItem={renderActiveGame}
        keyExtractor={item => item.id}
      />
      <Modal visible={showPlayersModal} onRequestClose={() => setShowPlayersModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{currentGame?.playerIds.length}/{currentGame?.maxPlayers} Players</Text>
            {currentGame?.playerIds.map((playerId, index) => (
              <Text key={index}>{playerId}</Text>
            ))}
            <Button title="Join" onPress={joinGame} />
            <Button title="Close" onPress={() => setShowPlayersModal(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  },
  cardImage: {
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
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
});

export default HomeScreen;
