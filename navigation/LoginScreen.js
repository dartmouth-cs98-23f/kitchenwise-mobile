import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Button, Input } from "../components/form_components";
import UserContext from "../context/user-context";
import themeStyles from "../styles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useContext(UserContext);

  const handleLogin = () => {
    setUserId();
    navigation.navigate("Pantry");
  };

  const handleSignUp = () => {
    // TODO: Handle sign-up logic or navigation here
    navigation.navigate("CreateAccount");
  };

  return (
    <View style={styles.container}>
      <View style={styles.splashContainer}>
        <Text style={styles.header}>kitchenwise.</Text>
        <Text style={styles.subtitle}>Command Your Kitchen.</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleLogin}
            containerStyle={styles.button}
            text="Log In"
            color="#222"
            textColor="white"
          />
          <Button
            onPress={handleSignUp}
            containerStyle={styles.button}
            text="Sign Up"
          />
        </View>

        <View style={styles.socialLoginContainer}>
          <Text style={styles.orText}>Or sign in with</Text>
          <View style={styles.socialButtons}>
            <Image
              source={require("../assets/google-icon.png")}
              style={styles.socialIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#64D2D9",
  },
  subtitle: {
    fontSize: 20,
    color: "#878585",
  },
  splashContainer: {
    display: "flex",
    height: "50%",
    justifyContent: "center",
  },
  formContainer: {
    display: "flex",
    height: "50%",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 24,
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    gap: 12,
  },
  buttonContainer: {
    width: "100%",
  },
  forgotPasswordText: {
    alignSelf: "flex-end",
    color: themeStyles.colors.interactableText,
  },
  button: {
    width: "100%",
    borderRadius: 16,
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
});

export default LoginScreen;
