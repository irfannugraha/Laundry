import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF5FB',
  },

  itemConstructor: {
    height: 80,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  itemChildConstructor: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'center',
    borderStartWidth: 2,
    borderColor: '#EBF5FB',
  },
  itemTglContainer:{
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
});