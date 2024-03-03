import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import UserContext from "../context/user-context";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useContext(UserContext);

  const handleLogin = () => {
    // TODO: Add authentication logic here
    // For now, we just navigate to the next screen
    navigation.navigate("Pantry");
  };

  const handleSignUp = () => {
    // TODO: Handle sign-up logic or navigation here
    navigation.navigate("CreateAccount");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>kitchenwise.</Text>
      <Text style={styles.subtitle}>
        The Future of Cooking.{"\n"}Powered by Your Voice.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.socialLoginContainer}>
        <Text style={styles.orText}>Or sign in with</Text>
        <View style={styles.socialButtons}>
          <Image
            source={require("../assets/google-icon.png")}
            style={styles.socialIcon}
          />
        </View>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.orText}>Or</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#64D2D9",
    marginTop: "-25%",
  },
  subtitle: {
    fontSize: 20,
    color: "#353434",
    marginBottom: "20%",
  },
  inputContainer: {
    width: "90%",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#f7f7f7",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 20,
    padding: 16,
    marginBottom: "5%",
    fontSize: 18, // Updated size for larger placeholder text
    textAlign: "center", // Center text horizontally
    textAlignVertical: "center", // Center text vertically
    height: 50, // Fixed height to ensure vertical centering
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  forgotPasswordText: {
    alignSelf: "flex-end",
    color: "#000",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    width: "90%",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },

  socialLoginContainer: {
    alignItems: "center",
    marginBottom: 16,
    marginTop: 30,
  },
  orText: {
    color: "#000",
    marginBottom: 8,
    fontSize: 16,
  },
  socialButtons: {
    paddingTop: "2.5%",
    flexDirection: "row",
    justifyContent: "space-around",
    // width: '%',
  },
  socialIcon: {
    width: 35,
    height: 35,
  },
  signUpContainer: {
    position: "absolute",
    bottom: "5%",
    alignItems: "center",
  },
  signUpText: {
    color: "#5B7B94",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default LoginScreen;
