import React, { useEffect, useState, useContext, useCallback } from "react";
import { Text, StyleSheet, Modal, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import {
  confirmAction,
  getPendingAction,
  rejectAction,
  reviseAction,
} from "../../api/addaction-api";
import themeStyles from "../../styles";
import { Button, Input, ProgressButton, Select } from "../form_components";
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
    expirationDate: new Date("2023-11-08"),
  },
  date: new Date("2023-11-01T18:52:16.703Z"),
  status: "PENDING",
};

// How many seconds the modal stays open before autoconfirming
const MAX_TIME_OPEN = 10;

const RevisionModal = () => {
  const [currAction, setCurrAction] = useState(DEFAULT_ACTION);
  const [foodName, setFoodName] = useState(null);
  const [foodQuantity, setFoodQuantity] = useState(null);
  const [foodUnit, setFoodUnit] = useState(null);
  const [foodExpiration, setFoodExpiration] = useState(null);
  const [actionInventory, setActionInventory] = useState(null);
  const [timeOpen, setTimeOpen] = useState(0);
  const { userInventories } = useContext(InventoryContext);
  const { userId } = useContext(UserContext);
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        getPendingAction(userId).then((pendingAction) => {
          if (pendingAction) {
            setCurrAction(pendingAction);
          } else if (currAction != null) {
            // setReviseFood(null);
            // setActionId(null);
          }
        }),
      500
    );
    // useEffect "destructor" that clears the previous interval whenever this useEffect is re-run
    return () => clearInterval(intervalId);
  }, [userId, setCurrAction]);
  useEffect(() => {
    if (currAction != null) {
      const { foodItem, inventoryId } = currAction;
      setFoodName(foodItem.name);
      setFoodQuantity(foodItem.quantity.toString());
      setFoodUnit(foodItem.unit);
      setFoodExpiration(moment(foodItem.expirationDate).format("L"));
      setActionInventory(inventoryId);
      const intervalId = setInterval(() => {
        setTimeOpen((prev) => prev + 0.25);
      }, 250);
      return () => clearInterval(intervalId);
    }
  }, [
    currAction,
    setFoodName,
    setFoodQuantity,
    setFoodUnit,
    setFoodExpiration,
    setActionInventory,
    setTimeOpen,
  ]);

  useEffect(() => {
    if (currAction) {
      if (timeOpen >= MAX_TIME_OPEN) {
        onConfirm();
        setCurrAction(null);
      }
    }
  }, [timeOpen, onConfirm, setCurrAction]);

  const onCancel = useCallback(() => {
    rejectAction(currAction._id).then(() => {
      setCurrAction(null);
    });
  }, [currAction, setCurrAction]);
  const onConfirm = useCallback(() => {
    const newAction = currAction;
    const newFoodItem = {
      name: foodName,
      quantity: Number(foodQuantity),
      unit: foodUnit,
      expirationDate: moment(foodExpiration, "L").toDate(),
    };
    newAction.foodItem = newFoodItem;
    newAction.inventoryId = actionInventory;
    reviseAction(newAction).then(() => {
      setCurrAction(null);
    });
  }, [
    foodName,
    foodQuantity,
    foodUnit,
    foodExpiration,
    actionInventory,
    setCurrAction,
  ]);
  return (
    <Modal
      visible={currAction != null}
      transparent={true}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
    >
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
                value={foodName}
                style={styles.formInput}
                onChangeText={(val) => {
                  setFoodName(val);
                }}
              />
            </View>
            <View style={styles.formRow}>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.text.h5}>Quantity</Text>
                <Input
                  keyboardType="numeric"
                  defaultValue={foodQuantity}
                  style={styles.formInput}
                  onChangeText={(val) => {
                    setFoodQuantity(val);
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={themeStyles.text.h5}>Unit</Text>
                <Input
                  defaultValue={foodUnit}
                  style={styles.formInput}
                  onChangeText={(val) => {
                    setFoodUnit(val);
                  }}
                />
              </View>
            </View>
            <View>
              <Text style={themeStyles.text.h5}>Expiration Date</Text>
              <Input
                defaultValue={foodExpiration}
                style={styles.formInput}
                placeholder="MM/DD/YYYY (Optional)"
                onChangeText={(val) => {
                  setFoodExpiration(val);
                }}
              />
            </View>
            <View>
              <Text style={themeStyles.text.h5}>Inventory</Text>
              <Select
                selectedValue={actionInventory}
                onValueChange={(itemVal, itemIdx) => {
                  setActionInventory(itemVal);
                }}
              >
                {userInventories?.map((inv) => (
                  <Picker.Item
                    label={inv.title}
                    value={inv._id}
                    key={inv._id}
                  />
                ))}
              </Select>
            </View>
          </View>
          <View style={styles.modalFooter}>
            <Button
              text="Cancel"
              color={themeStyles.colors.failure}
              textColor="white"
              onPress={onCancel}
            />
            <ProgressButton
              text="Confirm"
              color="#7EB37D"
              progressColor="#158013"
              textColor="white"
              progress={timeOpen / MAX_TIME_OPEN}
              onPress={onConfirm}
            />
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
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  modalPadding: {
    height: "100%",
    width: "100%",
    backgroundColor: "backgroundColor: 'rgba(217,217,217, 0.4)'",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: {
    backgroundColor: "#FFF",
    flexDirection: "column",
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
