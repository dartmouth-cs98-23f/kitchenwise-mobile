import React, { useCallback, useContext, useState } from "react";
import { View, Modal, StyleSheet, Text, TextInput } from "react-native";
import { Input } from "../form_components";
import LoginButton from "./LoginButton";
import UserContext from "../../context/user-context";

const DEFAULT_USER_ID = "653997da2d9889247c37976e";

const LoginScreen = ({ navigation }) => {
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userId, setUserId } = useContext(UserContext);

  const newAccountHandler = useCallback(() => {
    setIsNewAccount(true);
    setModalVisible(true);
  }, [setIsNewAccount, setModalVisible]);

  const openLoginModal = useCallback(() => {
    setModalVisible(true);
  }, [setModalVisible]);

  const closeLoginModal = useCallback(() => {
    setModalVisible(false);
    setIsNewAccount(false);
  }, [setModalVisible, setIsNewAccount]);

  const sendLogin = useCallback(() => {
    // TODO: rig up to API
    setUserId(DEFAULT_USER_ID);
  }, [setUserId]);

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <Text style={styles.headModalText}>Kitchenwise.</Text>
        <View style={styles.loginContainer}>
          <View style={styles.inputContainer}>
            <Input
              style={styles.loginInput}
              placeholder="Username"
              onChangeText={(text) => setUsername(text)}
            />
            <Input
              style={styles.loginInput}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
            />
            {isNewAccount && (
              <Input
                style={styles.loginInput}
                placeholder="Confirm Password"
                onChangeText={(text) => setPassword(text)}
              />
            )}
          </View>
          <LoginButton
            text="Login"
            isBlack={true}
            onPress={() => {
              // TODO : Add Auth here later
              sendLogin();
              closeLoginModal();
              navigation.navigate("Pantry");
            }}
          />
          <LoginButton
            text="Cancel"
            onPress={closeLoginModal}
            isBlack={false}
          />
        </View>
      </Modal>
      <CenterText />
      <View style={styles.buttonContainer}>
        <LoginButton text="Login" onPress={openLoginModal} isBlack={true} />
        <LoginButton
          text="Create New Account"
          onPress={newAccountHandler}
          isBlack={false}
        />
      </View>
    </View>
  );
};

const CenterText = () => {
  // text at center of page befote log in button is pressed
  return (
    <View style={styles.textContainer}>
      <Text style={styles.headText}>Kitchenwise.</Text>
      <Text style={styles.bodyText}>
        The Future of Cooking. Powered by Alexa.
      </Text>
    </View>
  );
};

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
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginBottom: "50%",
  },
  headText: {
    // header text
    alignItems: "center",
    justifyContent: "center",
    // fontWeight: 600,
    fontSize: 35,
    padding: 20,
  },
  headModalText: {
    // header text
    flex: 1,
    marginTop: "50%",
    // fontWeight: 600,
    fontSize: 35,
    padding: 20,
    marginBottom: 0,
  },
  bodyText: {
    // text following header text
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  loginContainer: {
    flex: 4,
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  loginInput: {
    padding: 8,
    width: "100%",
    borderColor: "#cccccc",
    borderWidth: 1,
    margin: 5,
    color: "black",
    borderRadius: 8,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 50,
  },
});

export default LoginScreen;
