import { TouchableOpacity, StyleSheet } from "react-native";

import themeStyles from "../styles";

const Bubble = ({ color, children, positionStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.bubbleContainer,
        positionStyle,
        { backgroundColor: color || themeStyles.colors.interactableBackground },
      ]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    position: "absolute",
    backgroundColor: themeStyles.colors.interactableBackground,
    width: 48,
    height: 48,
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});

export default Bubble;
