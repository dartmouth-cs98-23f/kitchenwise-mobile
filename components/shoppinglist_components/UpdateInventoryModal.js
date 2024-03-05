import { useState, useContext, useCallback } from "react";
import { Picker } from "@react-native-picker/picker";

import InventoryContext from "../../context/inventory-context";
import BottomModal from "../modals/BottomModal";

const UpdateInventoryModal = ({ visible, onCancel, onSubmit }) => {

  const { userInventories } = useContext(InventoryContext);
  const [selectedInventoryId, setSelectedInventoryId] = useState(userInventories[0]._id);
  const onConfirm = useCallback(() => {
    const selectedInventory = userInventories.filter(
      (inv) => inv._id === selectedInventoryId
    )[0];
    onSubmit(selectedInventory);
  }, [onSubmit, selectedInventoryId]);

  return (
    <BottomModal
      visible={visible}
      onCancel={onCancel}
      onConfirm={onConfirm}
      title="Select an Inventory"
    >
      {userInventories && (
        <Picker
          selectedValue={selectedInventoryId}
          onValueChange={setSelectedInventoryId}
        >
          {userInventories.map((inv, i) => (
            <Picker.Item label={inv.title} value={inv._id} key={i} />
          ))}
        </Picker>
      )}
    </BottomModal>
  );
};

export default UpdateInventoryModal;
