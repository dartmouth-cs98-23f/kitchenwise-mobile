import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Input, Button } from "../components/form_components";

const CreateAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmPress = () => {
    // TODO: Implement the create account logic
    navigation.navigate("Pantry");
  };
  const handleBack = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.splashContainer}>
        <Text style={styles.title}>kitchenwise.</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email address"
            onChangeText={setEmail}
            value={email}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <Input
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.button}
            onPress={handleConfirmPress}
            text="Confirm"
            color="#222"
            textColor="white"
          />
          <Button
            style={styles.button}
            onPress={() => navigation.goBack()}
            text="Cancel"
          />
        </View>
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
  splashContainer: {
    display: "flex",
    height: "30%",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#64D2D9",
    marginBottom: "45%",
  },
  formContainer: {
    display: "flex",
    gap: 28,
    width: "100%",
    paddingHorizontal: 20,
  },
  inputContainer: {
    display: "flex",
    gap: 12,
    width: "100%",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 16,
  },
});

export default CreateAccountScreen;
