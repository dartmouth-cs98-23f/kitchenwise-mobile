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

// How many seconds the modal stays open before autoconfirming
const MAX_TIME_OPEN = 10;

const RevisionModal = () => {
  const [currAction, setCurrAction] = useState(null);
  const [foodName, setFoodName] = useState(null);
  const [foodQuantity, setFoodQuantity] = useState(null);
  const [foodUnit, setFoodUnit] = useState(null);
  const [foodExpiration, setFoodExpiration] = useState(null);
  const [actionInventory, setActionInventory] = useState(null);
  const [timeOpen, setTimeOpen] = useState(0);
  const { userInventories } = useContext(InventoryContext);
  const { userId } = useContext(UserContext);

  // initiates a looped interval that polls backend for any pending actions
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        getPendingAction(userId).then((pendingAction) => {
          // if there is a new pending action, replace the current one
          if (pendingAction && pendingAction._id != currAction?._id) {
            setCurrAction(pendingAction);
            // if there is no longer a pending action and we're still displaying one, reset it:
            //   backend as the single source of truth
          } else if (pendingAction == null && currAction != null) {
            setCurrAction(null);
            setActionId(null);
          }
        }),
      500
    );
    // useEffect "destructor" that clears the previous interval whenever this useEffect is re-run
    return () => clearInterval(intervalId);
  }, [userId, setCurrAction, currAction]);

  // when a new action is loaded, populate the form values
  useEffect(() => {
    if (currAction != null) {
      setTimeOpen(0);
      const { foodItem, inventoryId } = currAction;
      setFoodName(foodItem.name);
      setFoodQuantity(foodItem.quantity.toString());
      setFoodUnit(foodItem.unit);
      console.log(foodItem?.expirationDate);
      if (foodItem.expirationDate)
        setFoodExpiration(
          moment.utc(foodItem.expirationDate.toLocaleString()).format("L")
        );
      setActionInventory(inventoryId);
      const intervalId = setInterval(() => {
        setTimeOpen((prev) => prev + 0.25);
      }, 250);
      return () => clearInterval(intervalId);
    }
  }, [currAction]);

  // every time the timeOpen changes, check if it's past the max, and if so, auto-confirm
  useEffect(() => {
    if (currAction) {
      if (timeOpen >= MAX_TIME_OPEN) {
        onConfirm();
        setCurrAction(null);
      }
    }
  }, [timeOpen, onConfirm, setCurrAction]);

  // sends rejection to backend
  const onCancel = useCallback(() => {
    rejectAction(currAction._id).then(() => {
      setCurrAction(null);
    });
  }, [currAction, setCurrAction]);

  // builds new AddAction object with form data and sends it to the backend
  // TODO: validation
  const onConfirm = useCallback(() => {
    const newAction = currAction;
    const newFoodItem = {
      name: foodName,
      quantity: Number(foodQuantity),
      unit: foodUnit,
      expirationDate: moment.utc(foodExpiration, "L").toDate(),
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
    currAction,
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
