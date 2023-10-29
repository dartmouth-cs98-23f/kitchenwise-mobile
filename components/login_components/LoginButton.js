import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function LoginButton(props) {
  return (
    <TouchableOpacity
      style={props.isBlack ? styles.buttonBlack : styles.buttonWhite}
      onPress={props.onClick}
    >
      <Text style={props.isBlack ? styles.buttonTextWhite : styles.buttonTextBlack}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBlack: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 100,
    width: '100%',
    marginBottom: 15,
    height: 48,
  },
  buttonWhite: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 100,
    width: '100%',
    marginBottom: 15,
    height: 48,

  },
  buttonTextWhite: {
    color: '#FFFFFF',
    fontWeight: '400',
  },
  buttonTextBlack: {
    color: 'black',
    fontWeight: '400',
  },
});

export default LoginButton;
