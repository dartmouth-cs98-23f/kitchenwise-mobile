import { View } from "react-native";
import BottomModal from "../modals/BottomModal";

const EditModal = ({ visible }) => {
  return (
    <BottomModal title="Edit Item" visible={visible}>
      <View></View>
    </BottomModal>
  );
};

export default EditModal;
