import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  styleContainer: {
    flexDirection: 'column',
    alignItems: 'center',

  },
  styleContainerChild: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  styleText: {
    fontSize: 15,
    color: 'black',
  },
  styleInput: {
    fontSize: 20,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: -10,
    paddingBottom: 5,
  },
})