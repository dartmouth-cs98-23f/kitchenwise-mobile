import {View, Modal, StyleSheet, Text} from 'react-native';
import StartButton from './StartButton';


const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CenterText />
      <StartButton navigation={navigation}/>
    </View>
  );
}

const CenterText = () => {  // text at center of page befote log in button is pressed
  return (
    <View style={styles.textContainer}>
      <Text style={styles.headText}>Kitchenwise.</Text>
      <Text style={styles.bodyText}>The Future of Cooking. Powered by Alexa.</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {  // main container holding everything
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {  // container for text in the center
    flex: 9,
    alignItems: "center",
    justifyContent: "center",
    width: '75%',
  },
  headText: {  // header text
    alignItems: "center",
    justifyContent: "center",
    fontWeight: '600',
    fontSize: 35,
    padding: 20,
  },
  bodyText: {  // text following header text
    alignItems: "center",
    justifyContent: "center",
    //fontFamily: 'Montserrat',
    fontSize: 15,
  },
});

export default LoginScreen;