import { StyleSheet } from "react-native";

const themeStyles = StyleSheet.create({
  text: {
    h4: {
      // fontWeight: 500,
      fontSize: 26,
      lineHeight: 32,
    },
    h5: {
      // fontWeight: 600,
      fontSize: 20,
      lineHeight: 26,
    },
    subtitle1: {
      // fontWeight: 500,
      fontSize: 16,
      lineHeight: 22,
    },
  },
  colors: {
    success: "#158013",
    failure: "#F22424",
  },
});

export default themeStyles;
