import React, { useEffect, useState, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Easing,
} from "react-native";

// props.progress is a decimal percent, with 0 being 0%, 1 being 100%, etc...
function ProgressButton(props) {
  const widthAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: props.progress,
      duration: 250,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [props.progress]);
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
      <Animated.View
        style={[
          styles.progressBackground,
          { backgroundColor: props.progressColor },
          {
            width: widthAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      ></Animated.View>
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
    paddingVertical: 10,
    borderRadius: 100,
    width: "100%",
    marginBottom: 15,
    height: 48,
    position: "relative",
    overflow: "hidden",
  },
  buttonText: {
    fontWeight: "400",
  },
  progressBackground: {
    height: 48,
    paddingVertical: 10,
    position: "absolute",
    left: 0,
  },
});

export default ProgressButton;
