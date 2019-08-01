import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerStyle: {
    margin: 20,
    borderWidth: 2,
    padding: 5,
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
  },
  switchOnStyle: {
    width: '50%',
    backgroundColor: 'red',
    position: 'relative',
  },
  switchOffStyle: {
    flex: 1,
  },
})