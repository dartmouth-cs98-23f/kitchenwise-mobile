import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import moment from "moment";
import BottomModal from "../modals/BottomModal";
import Input from "../form_components/Input";
import { Picker } from "@react-native-picker/picker";

const EditModal = ({ visible, foodItem, inventories, onClose, onSubmit }) => {
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [inventoryId, setInventoryId] = useState(null);
  useEffect(() => {
    setName(foodItem?.name);
    setQuantity(foodItem?.quantity);
    setUnit(foodItem?.unit || "");
    setExpirationDate(
      foodItem?.expirationDate
        ? moment.utc(foodItem?.expirationDate, "L").toDate()
        : null
    );
    setInventoryId(foodItem?.inventoryId);
  }, [foodItem]);
  const onConfirm = useCallback(() => {
    onSubmit({
      name,
      quantity,
      unit,
      expirationDate: expirationDate
        ? moment.utc(expirationDate, "L").toDate()
        : null,
      inventoryId,
    });
  }, [onSubmit, name, quantity, unit, expirationDate, inventoryId]);
  return (
    <BottomModal
      title="Edit Item"
      visible={visible}
      onCancel={onClose}
      onConfirm={onConfirm}
    >
      <View style={styles.formContainer}>
        <Input value={name} onChangeText={setName} placeholder="Food Name" />
        <View style={styles.formRow}>
          <Input
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Quantity"
            style={{ width: "50%" }}
          />
          <Input
            value={unit}
            onChangeText={setUnit}
            placeholder="Unit"
            style={{ width: "50%" }}
          />
        </View>
        <Input
          value={expirationDate}
          onChangeText={setExpirationDate}
          placeholder="Expiration"
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
});

export default EditModal;
