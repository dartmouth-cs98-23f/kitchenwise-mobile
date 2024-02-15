import { Modal, Text, StyleSheet, View } from "react-native";
import Button from "../form_components/Button";
import themeStyles from "../../styles";

const BottomModal = ({ visible, children, title, onConfirm, onCancel }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.topPadding}></View>
        <View style={styles.modalContent}>
          <Text style={themeStyles.text.h2}>{title}</Text>
          <View>{children}</View>
          <View style={styles.buttonRow}>
            <Button text="Cancel" containerStyle={{ width: "50%" }} />
            <Button
              text="Confirm"
              containerStyle={{
                width: "50%",
                backgroundColor: themeStyles.colors.interactableBackground,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center" },
  topPadding: { flexGrow: 1 },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    display: "flex",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  buttonRow: { display: "flex", flexDirection: "row", width: "100%" },
});

export default BottomModal;
