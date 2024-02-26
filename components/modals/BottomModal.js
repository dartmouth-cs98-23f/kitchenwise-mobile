import { Modal, Text, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import Button from "../form_components/Button";
import themeStyles from "../../styles";

const BottomModal = ({
  visible,
  children,
  title,
  onConfirm,
  onCancel,
  oneButton,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [visible]);
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.topPadding}></View>
        <View style={styles.modalContent}>
          <Text style={[themeStyles.text.h2, { marginBottom: 8 }]}>
            {title}
          </Text>
          <View>{children}</View>
          <View style={styles.buttonRow}>
            {loading ? (
              <Text style={styles.loadingText}>Loading...</Text>
            ) : oneButton ? (
              <Button
                text="Done"
                onPress={() => {
                  onConfirm();
                  setLoading(true);
                }}
              ></Button>
            ) : (
              <>
                <Button
                  text="Cancel"
                  containerStyle={{ width: "50%" }}
                  onPress={() => {
                    onCancel();
                    setLoading(true);
                  }}
                />
                <Button
                  text="Confirm"
                  containerStyle={{
                    width: "50%",
                    backgroundColor: themeStyles.colors.interactableBackground,
                  }}
                  onPress={() => {
                    onConfirm();
                    setLoading(true);
                  }}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "center" },
  topPadding: { flexGrow: 1, backgroundColor: "#D9D9D9", opacity: 0.4 },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    display: "flex",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 8,
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { height: 48 },
});

export default BottomModal;
