import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Input } from "../form_components";
import themeStyles from "../../styles";

const CommandRow = ({ quantity, name, location, onDelete }) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.conjunctionText}>Add</Text>
      <Input value={quantity} style={styles.input} />
      <Text style={styles.conjunctionText}>of</Text>
      <Input value={name} style={styles.input} />
      <Text style={styles.conjunctionText}>to</Text>
      <Input value={location} style={styles.input} />
      <TouchableOpacity>
        <Ionicons
          name="remove-circle-outline"
          size={24}
          color={themeStyles.colors.uninteractableText}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 36,
    width: "100%",
    gap: 4,
  },
  input: {
    height: 28,
    width: "25%",
    fontSize: 10,
  },
  conjunctionText: {
    fontSize: 14,
  },
});

export default CommandRow;
