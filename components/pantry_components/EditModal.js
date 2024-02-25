import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

import BottomModal from "../modals/BottomModal";
import Input from "../form_components/Input";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import themeStyles from "../../styles";

const EditModal = ({
  visible,
  foodItem,
  inventories,
  onClose,
  onSubmit,
  creating,
}) => {
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [inventoryId, setInventoryId] = useState(null);
  useEffect(() => {
    setName(foodItem?.name || "");
    setQuantity(foodItem?.quantity || "");
    setUnit(foodItem?.unit || "");
    setExpirationDate(
      foodItem?.expirationDate
        ? moment.utc(foodItem?.expirationDate).format("L")
        : null
    );
    setInventoryId(foodItem?.inventoryId || inventories?.[0]?._id || null);
  }, [foodItem, inventories]);
  // TODO: input validation
  const onConfirm = useCallback(() => {
    onSubmit({
      name,
      quantity: Number(quantity),
      unit,
      expirationDate: expirationDate
        ? moment.utc(expirationDate, "L").toDate()
        : null,
      inventoryId,
    });
    setName("");
    setQuantity("");
    setUnit("");
    setExpirationDate("");
  }, [onSubmit, name, quantity, unit, expirationDate, inventoryId]);
  const onIncrementQuantity = useCallback(
    (amount) => {
      setQuantity((prevQuantity) => (Number(prevQuantity) + amount).toString());
    },
    [setQuantity]
  );
  return (
    <BottomModal
      title={creating ? "Create New Item" : "Edit Item"}
      visible={visible}
      onCancel={onClose}
      onConfirm={onConfirm}
    >
      <View style={styles.formContainer}>
        <Input value={name} onChangeText={setName} placeholder="Food Name" />
        <View style={styles.formRow}>
          <Input
            value={quantity}
            onChangeText={(newText) =>
              setQuantity(newText.replace(/[^0-9]/g, ""))
            }
            placeholder="Quantity"
            style={{ width: "25%" }}
          />
          <Input
            value={unit}
            onChangeText={setUnit}
            placeholder="Unit (optional)"
            style={{ flexShrink: 1 }}
          />
          {!creating && (
            <View style={styles.incrementRow}>
              <TouchableOpacity
                style={[
                  styles.incrementButton,
                  { backgroundColor: themeStyles.colors.failure },
                ]}
                onPress={() => onIncrementQuantity(-1)}
              >
                <Ionicons name="remove-outline" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.incrementButton,
                  { backgroundColor: themeStyles.colors.success },
                ]}
                onPress={() => onIncrementQuantity(1)}
              >
                <Ionicons name="add-outline" size={32} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Input
          value={expirationDate}
          onChangeText={setExpirationDate}
          placeholder="Expiration Date MM/DD/YYYY (optional)"
        />
        {inventories && (
          <Picker
            value={inventoryId}
            itemStyle={{ height: 56 }}
            onValueChange={(newValue) => setInventoryId(newValue)}
          >
            {inventories.map((inv) => (
              <Picker.Item label={inv.title} value={inv._id} key={inv._id} />
            ))}
          </Picker>
        )}
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  formContainer: { display: "flex", flexDirection: "column", gap: 8 },
  formRow: { display: "flex", flexDirection: "row", gap: 8 },
  picker: {
    height: 56,
  },
  incrementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  incrementButton: {
    width: 32,
    height: 32,
  },
});

export default EditModal;
