import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Modal, View, TextInput, Button } from "react-native";
import {
  confirmAction,
  getPendingAction,
  rejectAction,
} from "../../api/addaction-api";

const RevisionModal = () => {
  const [reviseFood, setReviseFood] = useState(null);
  const [actionId, setActionId] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        getPendingAction().then((pendingAction) => {
          if (pendingAction) {
            setReviseFood(pendingAction.foodItem);
            setActionId(pendingAction._id);
          } else if (reviseFood != null) {
            setReviseFood(null);
            setActionId(null);
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
          <View>
            <Text>New Entry</Text>
            <Text>Fix any wrong details</Text>
          </View>
          <View>
            <View>
              <Text>Food Title</Text>
              <TextInput defaultValue={reviseFood?.name} />
            </View>
            <View>
              <View>
                <Text>Quantity</Text>
                <TextInput
                  keyboardType="numeric"
                  defaultValue={reviseFood?.quantity}
                />
              </View>
              <View>
                <Text>Unit</Text>
                <TextInput defaultValue={reviseFood?.unit} />
              </View>
            </View>
            <View>
              <Text>Expiration Date</Text>
              <TextInput defaultValue={reviseFood?.expirationDate} />
            </View>
          </View>
          <View>
            <Button
              title="Cancel"
              onPress={() => rejectAction(actionId)}
            ></Button>
            <Button
              title="Confirm"
              onPress={() => confirmAction(actionId)}
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: "#FFFFFF",
  },
  modalPadding: {
    height: "100%",
    width: "100%",
    backgroundColor: "backgroundColor: 'rgba(217,217,217, 0.4)'",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default RevisionModal;
