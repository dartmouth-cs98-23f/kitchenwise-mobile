import React from "react";
import { TextInput, StyleSheet } from "react-native";

function Input(props) {
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholder={props.placeholder}
      value={props.value}
      defaultValue={props.defaultValue}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 8,
    width: "100%",
    borderColor: "#cccccc",
    borderWidth: 1,
    marginBottom: 15,
    color: "black",
    height: 48,
    borderRadius: 8,
  },
});

export default Input;
