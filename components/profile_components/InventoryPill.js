import { View, Text, StyleSheet } from "react-native";
import themeStyles from "../../styles";
const InventoryPill = ({ name }) => {
  return (
    <View style={styles.pillContainer}>
      <Text style={styles.titleText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    backgroundColor: themeStyles.colors.uninteractableBackground,
    width: 80,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  titleText: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default InventoryPill;
