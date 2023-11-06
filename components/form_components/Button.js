import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function Button(props) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        // ensures that containerstyle overwrites props.color, especially if props.color is undefined
        { backgroundColor: props.color },
        props.containerStyle,
      ]}
      onPress={props.onPress}
    >
      <Text
        style={[styles.buttonText, { color: props.textColor }, props.textStyle]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 100,
    width: "100%",
    marginBottom: 15,
    height: 48,
  },
  buttonText: {
    fontWeight: "400",
  },
});

export default Button;
