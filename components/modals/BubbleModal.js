import { View, Modal, StyleSheet, TouchableOpacity } from "react-native";

const BubbleModal = ({ visible, children, positionStyle, onPressOut }) => {
  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity style={styles.backContainer} onPress={onPressOut} />
      <View style={[styles.frontContainer, positionStyle]}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  frontContainer: {
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  backContainer: {
    height: "100%",
    width: "100%",
    opacity: 0,
    position: "absolute",
    elevation: -1,
  },
});

export default BubbleModal;
