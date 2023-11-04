import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/login_components/LoginScreen";
import MainHomePage from "./navigation/MainHomePage";
import RevisionModal from "./components/modals/RevisionModal";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={LoginScreen}
            options={{ title: "Welcome", headerShown: true }}
          />
          <Stack.Screen
            name="MainHomePage"
            component={MainHomePage}
            options={{ title: "Main Home Page", headerShown: false }}
          />
          {/* //add stack screens here like: <Stack.Screen name="Name" component={ScreenName} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // main container holding everything
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    // container for text in the center
    flex: 9,
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
  },
  buttonContainer: {
    // container for button
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    // actual button
    backgroundColor: "#000000",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    width: "80%",
  },
  buttonText: {
    // text inside butoon
    color: "#FFFFFF",
    //fontFamily: 'Montserrat',
    fontWeight: "400",
  },
});
