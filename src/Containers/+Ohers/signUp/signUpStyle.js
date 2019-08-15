import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
  },
  containerChild: {
    flex: 3, 
    justifyContent: 'center',
  },
  inputStyle: {
    borderBottomWidth: 1, 
    marginTop: 20,
    paddingStart: 20,
    borderRadius: 1000,
  },
  buttonStyle: {
    height: 50,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 1000,
  },
  textContainerStyle: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    
  },

  forgotpassStyle: {
    
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});