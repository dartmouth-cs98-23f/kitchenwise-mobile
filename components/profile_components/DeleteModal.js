import { useCallback, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import BottomModal from "../modals/BottomModal";
const DeleteModal = ({
  visible,
  onClose,
  onSubmit,
  inventoryTitle,
  inventories,
}) => {
  const [pickedInventoryId, setPickedInventoryId] = useState(null);

  return (
    <BottomModal
      visible={visible}
      title={`Delete Inventory "${inventoryTitle}"`}
      onConfirm={() => onSubmit(pickedInventoryId)}
      onCancel={onClose}
    >
      <View style={styles.formContainer}>
        <Text>
          Are you sure you'd like to delete this inventory? If you are, choose
          where to move its items.
        </Text>
        <Picker
          selectedValue={pickedInventoryId}
          onValueChange={(newValue) => setPickedInventoryId(newValue)}
        >
          {inventories
            .filter((inv) => inv.title != inventoryTitle)
            .map((inv) => (
              <Picker.Item label={inv.title} value={inv._id} key={inv._id} />
            ))}
        </Picker>
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 8,
  },
});

export default DeleteModal;
