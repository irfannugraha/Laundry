import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerChild: {
    flex: 1,
    justifyContent: "flex-end",
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
  },
  loadingContainer: {
    flex: 1.5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingContainerChild: {
    marginTop: 20,
    margin: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
  },
  loading: {
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 1000,
  },
});