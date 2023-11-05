import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, Modal, View } from "react-native";
import { Picker } from "react-native-web";
import {
  confirmAction,
  getPendingAction,
  rejectAction,
} from "../../api/addaction-api";
import themeStyles from "../../styles";
import { Button, Input, Select } from "../form_components";
import InventoryContext from "../../context/inventory-context";
import UserContext from "../../context/user-context";

const DEFAULT_ACTION = {
  _id: "65429e607ef8587232415ef5",
  ownerId: "653997da2d9889247c37976e",
  inventoryId: "653ae18c69e3eb4c94de9af2",
  foodItem: {
    name: "butter",
    quantity: 5,
    unit: "oz",
    tags: [],
  },
  date: new Date("2023-11-01T18:52:16.703Z"),
  status: "PENDING",
};

const RevisionModal = () => {
  const [reviseAction, setReviseAction] = useState(DEFAULT_ACTION);
  const { userInventories } = useContext(InventoryContext);
  const { userId } = useContext(UserContext);
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        getPendingAction(userId).then((pendingAction) => {
          if (pendingAction) {
            setReviseAction(pendingAction);
          } else if (reviseAction != null) {
            // setReviseFood(null);
            // setActionId(null);
          }
        }),
      500
    );
    // useEffect "destructor" that clears the previous interval whenever this useEffect is re-run
    return () => clearInterval(intervalId);
  }, [userId, setReviseAction]);
  return (
    <Modal visible={reviseAction != null} transparent={true}>
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
              <Input
                defaultValue={reviseAction?.foodItem?.name}
                style={styles.formInput}
              />
            </View>
            <View style={styles.formRow}>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.text.h5}>Quantity</Text>
                <Input
                  keyboardType="numeric"
                  defaultValue={reviseAction?.foodItem?.quantity?.toString()}
                  style={styles.formInput}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.text.h5}>Unit</Text>
                <Input
                  defaultValue={reviseAction?.foodItem?.unit}
                  style={styles.formInput}
                />
              </View>
            </View>
            <View>
              <Text style={themeStyles.text.h5}>Expiration Date</Text>
              <Input
                defaultValue={reviseAction?.foodItem?.expirationDate}
                style={styles.formInput}
                placeholder="Optional"
              />
            </View>
            <View>
              <Text style={themeStyles.text.h5}>Inventory</Text>
              <Select selectedValue={reviseAction?.inventoryId}>
                {userInventories?.map((inv) => (
                  <Picker.Item
                    label={inv.title}
                    value={inv._id}
                    key={inv._id}
                  />
                ))}
              </Select>
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
