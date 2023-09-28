import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center', 
  },
  input: {
    color: 'black',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  registerButton: {
    height: 60, // increased height
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 17

  },
  loginButton: {
    height: 60, // increased height
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17
  },
  errorMessage: {
    color: '#FF0000',
    marginTop: 10,
  },
  activityContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: '30%', // to ensure three columns
  },
  activityText: {
    fontSize: 16,
    marginBottom: 10,
  },
  activityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default styles;
