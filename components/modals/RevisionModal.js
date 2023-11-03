import React, { useEffect } from "react";
import { Text, StyleSheet, Modal } from "react-native";
import { getPendingAction } from "../../api/addaction-api";

const RevisionModal = () => {
  useEffect(() => {
    getPendingAction();
  }, []);
  return (
    <Modal style={{ opacity: 0 }}>
      <Text>Hello</Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
});
export default RevisionModal;
