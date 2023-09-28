import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

const activities = [
  { id: '1', title: 'Billiards', img: require('../assets/billiards.jpg') },
  { id: '2', title: 'Dungeons & Dragons', img: require('../assets/dnd.jpg') },
  { id: '3', title: 'Ping Pong', img: require('../assets/pingpong.jpg') },
  // Add more activities here...
];

const Item = ({ title, img }) => (
  <TouchableOpacity onPress={() => {
    Alert.alert(
      `Select experience level for ${title}`,
      "",
      [
        {
          text: "Beginner",
          onPress: () => console.log(`Selected Beginner for ${title}`)
        },
        {
          text: "Intermediate",
          onPress: () => console.log(`Selected Intermediate for ${title}`)
        },
        {
          text: "Expert",
          onPress: () => console.log(`Selected Expert for ${title}`)
        },
        {
          text: "Cancel",
          onPress: () => console.log(`Cancelled experience selection for ${title}`),
          style: "cancel"
        }
      ]
    );
  }}>
    <View style={styles.item}>
      <Card>
        <Card.Cover source={img} style={styles.cardImage} resizeMode='cover'/>
        <Card.Content>
          <Text style={styles.title}>{title}</Text>
        </Card.Content>
      </Card>
    </View>
  </TouchableOpacity>
);

const ProfileScreen = () => {

  const renderActivity = ({ item }) => (
    <Item title={item.title} img={item.img} />
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.userName}>John Doe</Text>
      <Image source={require('../assets/pinball.jpg')} style={styles.profileImg} />
      <Text style={styles.header}>Activities</Text>
      <FlatList
        horizontal
        data={activities}
        renderItem={renderActivity}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center'
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  item: {
    padding: 10,
    marginVertical: 8,
    width: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cardImage: {
    height: 150,
  },
});

export default ProfileScreen;
