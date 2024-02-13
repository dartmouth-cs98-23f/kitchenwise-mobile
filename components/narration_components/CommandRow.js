import { StyleSheet, View, Text } from "react-native";

import { Input } from "../form_components";

const CommandRow = ({ quantity, name, location }) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.conjunctionText}>Add</Text>
      <Input value={quantity} style={styles.input} />
      <Text style={styles.conjunctionText}>of</Text>
      <Input value={name} style={styles.input} />
      <Text style={styles.conjunctionText}>to</Text>
      <Input value={location} style={styles.input} />
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
    height: 36,
    fontSize: 14,
  },
});

export default CommandRow;
