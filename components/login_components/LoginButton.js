import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "../form_components";

function LoginButton(props) {
  return (
    <Button
      {...props}
      textColor={
        props.isBlack ? styles.buttonTextWhite : styles.buttonTextBlack
      }
      containerStyle={props.isBlack ? styles.buttonBlack : styles.buttonWhite}
      disabled={props?.disabled}
    />
  );
}

const styles = StyleSheet.create({
  buttonBlack: {
    backgroundColor: "black",
  },
  buttonWhite: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
  },
  buttonTextWhite: "white",
  buttonTextBlack: "black",
});

export default LoginButton;
