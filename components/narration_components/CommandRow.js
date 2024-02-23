import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Input } from "../form_components";
import themeStyles from "../../styles";
import { Picker } from "@react-native-picker/picker";

const CommandRow = ({
  quantity,
  name,
  location,
  onDelete,
  onItemChange,
  locationNames,
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
  const setLocation = useCallback(
    (location) => {
      setItem((prev) => ({ ...prev, location }));
    },
    [setItem]
  );
  useEffect(() => {
    onItemChange(item);
  }, [item]);
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.conjunctionText}>Add</Text>
      <Input value={quantity} style={styles.input} onChangeText={setQuantity} />
      <Text style={styles.conjunctionText}>of</Text>
      <Input value={name} style={styles.input} onChangeText={setName} />
      <Text style={styles.conjunctionText}>to</Text>
      <Picker
        value={location}
        onValueChange={setLocation}
        itemStyle={{ height: 20 }}
      >
        {locationNames.map((name) => (
          <Picker.Item name={name} value={name} key={name} />
        ))}
      </Picker>
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
