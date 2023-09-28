// FriendsStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: '100%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 10,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  userEmail: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

export default styles;
