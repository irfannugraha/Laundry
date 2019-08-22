import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#2EC5CB',
    flexDirection: 'row',
    borderRadius: 2,
    borderRadius: 100,
  },
  switchStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#2EC5CB',
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