import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const activities = [
  { id: '1', title: 'Billiards' },
  { id: '2', title: 'Dungeons & Dragons' },
  { id: '3', title: 'Ping Pong' },
  // Add more activities here...
];

const ActivitySelectionScreen = ({ navigation }) => {
  const [selectedActivities, setSelectedActivities] = useState([]);

  const toggleActivity = activity => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(act => act !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const finishSelection = () => {
    // Here you would normally update the user's document in Firestore with the selected activities
    // and then navigate to the 'Home' screen
    console.log('Selected activities:', selectedActivities);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Activities</Text>
      <FlatList
        data={activities}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={selectedActivities.includes(item.title) ? styles.selectedItem : styles.item}
            onPress={() => toggleActivity(item.title)}
          >
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.button} onPress={finishSelection}>
        <Text style={styles.buttonText}>Finish Selection</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ActivitySelectionScreen;
