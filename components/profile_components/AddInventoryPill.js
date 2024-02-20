import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import themeStyles from "../../styles";
const AddInventoryPill = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.pillContainer} onPress={onPress}>
      <Text style={styles.titleText}>Add</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    width: "100%",
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderColor: themeStyles.colors.uninteractableText,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 3,
    marginTop: 12,
  },
  titleText: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default AddInventoryPill;
