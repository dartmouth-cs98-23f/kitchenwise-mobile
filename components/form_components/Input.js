import React from "react";
import { TextInput, StyleSheet } from "react-native";

function Input(props) {
  const { style, ...otherProps } = props;
  return <TextInput style={[styles.input, style]} {...otherProps}></TextInput>;
}

const styles = StyleSheet.create({
  input: {
    padding: 8,
    width: "100%",

    backgroundColor: "#F2F2F2",
    color: "black",
    height: 48,
    borderRadius: 8,
  },
});

export default Input;
