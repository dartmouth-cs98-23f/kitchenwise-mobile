import {View, TouchableOpacity, Text, StyleSheet} from "react-native";

const StartButton = ({navigation}) => {  // button to get started
  return (
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('MainHomePage')}
    ><Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {  // container for button
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {  // actual button 
    backgroundColor: '#000000',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    width: '80%',
  },
  buttonText: {  // text inside butoon
    color: "#FFFFFF",
    // fontWeight: 400,
  },

});

export default StartButton;