import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import themeStyles from "../../styles";
const IntegrationPill = ({ onPress, source }) => {
  return (
    <TouchableOpacity style={styles.pillContainer} onPress={onPress}>
      <Image source={source} style={styles.pillLogo} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    backgroundColor: themeStyles.colors.uninteractableBackground,
    height: 48,
    width: 48,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 12,
    textAlign: "center",
  },
  pillLogo: {
    height: 40,
    width: 40,
  },
});

export default IntegrationPill;
