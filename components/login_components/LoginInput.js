import React from "react";
import { TextInput, StyleSheet } from "react-native";

function LoginInput(props) {
  return (
    <TextInput style={styles.loginInput} placeholder={props.placeholder}></TextInput>
  )
}

const styles = StyleSheet.create({
  loginInput: {
    padding: 8,
    width: '100%',
    borderColor: "#cccccc",
    borderWidth: 1,
    marginBottom: 15,
    color: "black",
    height: 51,
    borderRadius: 8,
  },
})

export default LoginInput;
