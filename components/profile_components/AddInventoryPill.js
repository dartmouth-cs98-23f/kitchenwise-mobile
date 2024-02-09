import { View, Text, StyleSheet } from "react-native";
import themeStyles from "../../styles";
const AddInventoryPill = () => {
  return (
    <View style={styles.pillContainer}>
      <Text style={styles.titleText}>Add</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    width: 80,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderColor: themeStyles.colors.uninteractableText,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 3,
  },
  titleText: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default AddInventoryPill;
