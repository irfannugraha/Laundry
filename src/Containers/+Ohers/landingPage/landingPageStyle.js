import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  bioContainerChild: {
    height: 80,
    flexDirection: 'row',
  },
  containerButtonStyle:{
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  headerButtonStyle:{
    width: 25, 
    height: 25,
  },

  containerStyle: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: '#F2F3F5',  
  },

  statusContainerStyle: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    flex: 1,
  },
  
  promoContainerStyle: {
    flex: 1,
    width: 300,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginEnd: 15,
  },
  promoChildContainerStyle: {
    backgroundColor: 'white',
    height: 60,
    flexDirection: 'row',
    padding: 10,
    paddingEnd: 20,
  },
});