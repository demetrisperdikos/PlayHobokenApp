import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
    alignSelf: 'center', // add this line
  },
  input: {
    width: 300,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 10,
  },
  loginButton: {
    width: 200,
    height: 40,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
  },
  registerButton: {
    width: 200,
    height: 40,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#FFFFFF',
  },
  errorMessage: {
    color: '#FF0000',
    marginTop: 10,
  }
});

export default styles;
