import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const themeStyles = StyleSheet.create({
  text: {
    h1: {
      fontFamily: "LatoBold",
      fontWeight: 500,
      fontSize: 32,
      color: "#353434",
    },
    h2: {
      fontFamily: "Inter",
      fontSize: 24,
    },
    h3: {
      fontFamily: "LatoBold",
      fontWeight: 500,
      fontSize: 18,
    },
    h4: {
      fontWeight: "500",
      fontSize: 26,
      lineHeight: 32,
    },
    h5: {
      fontWeight: "600",
      fontSize: 20,
      lineHeight: 26,
    },
    subtitle1: {
      fontWeight: "500",
      fontSize: 16,
      lineHeight: 22,
    },
  },
  colors: {
    success: "#158013",
    failure: "#F22424",

    interactableBackground: "#F2F2F2",
    interactableText: "#AAAAAA",
    uninteractableBackground: "#FAFAFA",
    uninteractableText: "#616161",
    selectedText: "#999999",
  },
  components: {
    screenContainer: {
      flex: 1,
      backgroundColor: "#fff",
      marginBottom: 0,
      paddingTop: 24,
      paddingHorizontal: 16,
      height: "100%",
    },
  },
});

export default themeStyles;
