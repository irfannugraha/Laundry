import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  containerChild: {
    paddingBottom: 35,
    backgroundColor: 'white',
    
    borderBottomWidth: 5,
    borderBottomColor: 'gainsboro',
  },
  inputStyle: {
    marginTop: 20,
    marginHorizontal: 20,
  },

  buttonContainerStyle: {
    flex: 1,
    justifyContent: "center",
  },

  // dropDownStyle: {
  //   flex: .1,
  // },

  dropDownStyle: {
    marginTop: -10,
  },
});