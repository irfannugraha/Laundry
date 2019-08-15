import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  containerChild: {
    paddingBottom: 20,
    
    borderBottomWidth: 5,
    borderBottomColor: 'gainsboro',
  },

  inputStyle: {
    borderBottomWidth: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },

  buttonContainerStyle: {
    height: 50,
    justifyContent: "center",
  },
});