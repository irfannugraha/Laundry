import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    borderRadius: 2,
  },
  switchStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: 'orange',
    backgroundColor: 'white',
  },
  firstContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seccondContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fontStyle: {
    fontWeight: '500',
    fontSize: 15,
    letterSpacing: 2,
  },
});