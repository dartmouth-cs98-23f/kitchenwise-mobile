import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Modal, View, TextInput } from "react-native";
import {
  confirmAction,
  getPendingAction,
  rejectAction,
} from "../../api/addaction-api";
import themeStyles from "../../styles";
import { Button, Input } from "../form_components";

const DEFAULT_FOOD = {
  name: "Carrot",
  quantity: "8",
  unit: "slices",
};

const RevisionModal = () => {
  const [reviseFood, setReviseFood] = useState(DEFAULT_FOOD);
  const [actionId, setActionId] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        getPendingAction().then((pendingAction) => {
          if (pendingAction) {
            setReviseFood(pendingAction.foodItem);
            setActionId(pendingAction._id);
          } else if (reviseFood != null) {
            // setReviseFood(null);
            // setActionId(null);
          }
        }),
      500
    );
    // useEffect "destructor" that clears the previous interval whenever this useEffect is re-run
    return () => clearInterval(intervalId);
  }, [setReviseFood, setActionId]);
  return (
    <Modal visible={reviseFood != null} transparent={true}>
      <View style={styles.modalPadding}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalHeader}>
            <Text style={themeStyles.text.h4}>New Entry</Text>
            <Text style={themeStyles.text.subtitle1}>
              Fix any wrong details
            </Text>
          </View>
          <View style={styles.modalBody}>
            <View>
              <Text style={themeStyles.text.h5}>Food Title</Text>
              <Input defaultValue={reviseFood?.name} style={styles.formInput} />
            </View>
            <View style={styles.formRow}>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.text.h5}>Quantity</Text>
                <Input
                  keyboardType="numeric"
                  defaultValue={reviseFood?.quantity}
                  style={styles.formInput}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.text.h5}>Unit</Text>
                <Input
                  defaultValue={reviseFood?.unit}
                  style={styles.formInput}
                />
              </View>
            </View>
            <View>
              <Text style={themeStyles.text.h5}>Expiration Date</Text>
              <Input
                defaultValue={reviseFood?.expirationDate}
                style={styles.formInput}
                placeholder="Optional"
              />
            </View>
            <View>
              <Button
                text="Cancel"
                color={themeStyles.colors.failure}
                textColor="white"
                onPress={rejectAction}
              />
              <Button
                text="Confirm"
                color={themeStyles.colors.success}
                textColor="white"
                onPress={confirmAction}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: "#FFFFFF",
    width: "80%",
  },
  modalPadding: {
    height: "100%",
    width: "100%",
    backgroundColor: "backgroundColor: 'rgba(217,217,217, 0.4)'",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeader: {
    padding: 16,
  },
  modalBody: {
    backgroundColor: "#FFF",
    padding: 16,
    flexDirection: "column",
    gap: 12,
  },
  formRow: {
    flexDirection: "row",
    gap: 16,
  },
  formInput: {
    backgroundColor: "#FFF",
    padding: 6,
    borderRadius: 4,
  },
  modalButton: {},
});
export default RevisionModal;
