import { StyleSheet, View } from "react-native";
import Input from "../form_components/Input";
import BottomModal from "../modals/BottomModal";
import { useCallback, useEffect, useState } from "react";

const CreateModal = ({ visible, onClose, onSubmit }) => {
  const [inventoryTitle, setInventoryTitle] = useState("");
  const onCancel = useCallback(() => {
    setInventoryTitle("");
    onClose();
  }, [onClose, setInventoryTitle]);
  const onConfirm = useCallback(() => {
    setInventoryTitle("");
    onSubmit(inventoryTitle);
  }, [setInventoryTitle, onSubmit, inventoryTitle, onClose]);
  return (
    <BottomModal
      visible={visible}
      title="Create New Inventory"
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <View style={styles.formContainer}>
        <Input
          placeholder="Enter new inventory name..."
          value={inventoryTitle}
          onChangeText={(newValue) => setInventoryTitle(newValue)}
        />
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 8,
  },
});

export default CreateModal;
