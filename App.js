import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CenterText />
      <StartButton navigation={navigation}/>
    </View>
  );
};

const CenterText = () => {  // text at center of page
  return (
    <View style={styles.textContainer}>
        <Text style={styles.headText}>Kitchenwise.</Text>
        <Text style={styles.bodyText}>The Future of Cooking. Powered by Alexa.</Text>
    </View>
  );
};

const StartButton = ({navigation}) => {  // button to get started
  return (
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button}
      onPress={() =>{}}
    ><Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome', headerShown: true}}
        />
        {/* // <Stack.Screen name="Name" component={ScreenName} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
    //fontFamily: 'Montserrat',
    fontWeight: '400',
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
  logoContainer: {  // semicircle at top right of page
    alignItems: 'center',
    flex: 1,
  },
});