import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Input } from "../form_components";
import themeStyles from "../../styles";

const CommandRow = ({
  quantity,
  name,
  location,
  onDelete,
  onItemChange,
  onLocationPress,
}) => {
  const [item, setItem] = useState({ quantity, name, location });
  const setQuantity = useCallback(
    (quantity) => {
      setItem((prev) => ({ ...prev, quantity }));
    },
    [setItem]
  );
  const setName = useCallback(
    (name) => {
      setItem((prev) => ({ ...prev, name }));
    },
    [setItem]
  );
  useEffect(() => {
    onItemChange(item);
  }, [item]);
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.conjunctionText}>Add</Text>
      <Input
        value={item.quantity}
        style={styles.input}
        onChangeText={setQuantity}
      />
      <Text style={styles.conjunctionText}>of</Text>
      <Input value={item.name} style={[styles.input]} onChangeText={setName} />
      <Text style={styles.conjunctionText}>to</Text>
      <TouchableOpacity
        onPress={() => {
          onLocationPress();
        }}
        style={styles.locationContainer}
      >
        <Text style={styles.locationText}> {item.location}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete}>
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
    flexWrap: "wrap",
  },
  input: {
    height: 28,
    fontSize: 10,
    flexGrow: 1,
    width: 72,
  },
  locationContainer: {
    backgroundColor: themeStyles.colors.interactableBackground,
    flexGrow: 1,
    height: 28,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  locationText: {
    fontSize: 10,
  },
  conjunctionText: {
    fontSize: 14,
  },
});

export default CommandRow;
