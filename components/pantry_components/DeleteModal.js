import { Text, View } from "react-native";
import BottomModal from "../modals/BottomModal";

const DeleteModal = ({ visible, foodString }) => {
  return (
    <BottomModal visible={visible} title="Confirm Deletion">
      <View style={{ paddingVertical: 8 }}>
        <Text>
          Are you sure you want to remove {foodString} from your inventory?
        </Text>
      </View>
    </BottomModal>
  );
};

export default DeleteModal;
