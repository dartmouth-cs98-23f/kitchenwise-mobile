import React, { useCallback, useState, useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import themeStyles from "../styles";
import UserContext from "../context/user-context";
import Navbar from "./Navbar";
import SearchBar from "../components/pantry_components/SearchBar";
import {
  createNewShoppingList,
  addItemToList,
  getUserShoppingListItems,
  exportToShoppingList,
  importToShoppingList,
} from "../api/shoppingList-api";
import { Button, Input } from "../components/form_components";
import Bubble from "../components/Bubble";
import BottomModal from "../components/modals/BottomModal";
import ShoppingListItem from "../components/shoppinglist_components/ShoppingListItem";
import BubbleModal from "../components/modals/BubbleModal";
import UpdateInventoryModal from "../components/shoppinglist_components/UpdateInventoryModal";

const ShoppingListPage = () => {
  const { userId } = useContext(UserContext);
  const [listItems, setListItems] = useState([]);
  const [isListAvailable, setListAvailable] = useState(false);
  const [isListEmpty, setListEmpty] = useState(false);
  const [additemModal, setAddItemModal] = useState(false);
  const [itemToAdd, setItemToAdd] = useState("");
  const [amountToAdd, setAmountToAdd] = useState("");
  const [pendingDeletions, setPendingDeletions] = useState([]); // list of all the items to be cleared or pushed to inventory clea
  const [selectionModalVisible, setSelectionModalVisible] = useState(false);
  const [updateInventoryModalVisible, setUpdateInventoryModalVisible] =
    useState(false);

  const [listName, setListName] = useState("list 1");

  const addToList = () => {
    addItemToList(userId, listName, itemToAdd, amountToAdd).then((data) => {
      setListItems(data.shoppingListItems);
    });
    setAddItemModal(false);
  };

  const promptAddItem = () => {
    setAddItemModal(true);
  };

  const cancelAdd = () => {
    setAddItemModal(false);
  };

  const togglePendingDeletion = (item) => {
    const isItemInPendingDeletions = pendingDeletions.some(
      (pendingItem) =>
        pendingItem.title === item.title && pendingItem.amount === item.amount
    );

    if (isItemInPendingDeletions) {
      // Remove the item from pendingDeletions
      const updatedPendingDeletions = pendingDeletions.filter(
        (pendingItem) =>
          pendingItem.title !== item.title || pendingItem.amount !== item.amount
      );
      setPendingDeletions(updatedPendingDeletions);
    } else {
      // Add the item to pendingDeletions
      setPendingDeletions([...pendingDeletions, item]);
    }
  };

  const cancelSelectionModal = () => {
    setSelectionModalVisible(false);
  };

  const createList = useCallback(() => {
    createNewShoppingList(userId, listName).then(() => {
      addItemToList(userId, listName, itemToAdd, amountToAdd).then((data) => {
        setListItems(data.shoppingListItems);
      });
    });

    setAddItemModal(false);
    setListAvailable(true);
  });

  const onAddUpdateInventoryPress = () => {
    setSelectionModalVisible(false);
    setUpdateInventoryModalVisible(true);
  };
  const sendItemsToInventory = useCallback(
    (inv) => {
      exportToShoppingList(userId, listName, pendingDeletions, inv)
        .then(() => {
          setUpdateInventoryModalVisible(false);
        })
        .catch((error) => {
          console.error("Error exporting items to inventory:", error);
        });
    },
    [pendingDeletions]
  );

  const importItems = useCallback(() => {
    importToShoppingList(userId, listName)
      .then((data) => {
        setListItems(data.shoppingListItems);
        setAddItemModal(false);
        setListAvailable(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          console.error("Error importing items:", error.message);
        }
      });
  });

  //TODO: pull in the items from the back end, should each category be dynamic via tags?
  const refreshItems = useCallback(() => {
    getUserShoppingListItems(userId, listName)
      .then((data) => {
        if (data.length > 0) {
          setListAvailable(true);
        } else {
          setListAvailable(false);
        }
        setListItems(data);
      })
      .catch((err) => {
        console.log("Shopping polling failed - server not online");
      });
  }, [userId, setListItems]);
  useEffect(() => {
    refreshItems();
    const interval = setInterval(refreshItems, 2500);
    return () => clearInterval(interval);
  }, [userId, refreshItems]);

  return (
    <>
      <SafeAreaView style={themeStyles.components.screenContainer}>
        <Text style={[themeStyles.text.h1, { marginBottom: 8 }]}>
          Your Shopping List
        </Text>

        {isListAvailable ? (
          <>
            <SearchBar />
            <View style={styles.listContainer}>
              <Text style={themeStyles.text.h3}>Category</Text>
              <View style={styles.line} />
              {/* <>{listItems.map((item) => <ShoppingListItem name={item.title} amount={item.amount} key={item._id}/>)}</> */}
              <View style={styles.list}>
                <FlatList
                  data={listItems}
                  renderItem={({ item }) => (
                    <ShoppingListItem
                      item={item}
                      name={item.title}
                      amount={item.amount}
                      key={item._id}
                      selectItems={togglePendingDeletion}
                    />
                  )}
                  keyExtractor={(item) => item._id}
                />
              </View>
            </View>
          </>
        ) : (
          <View style={styles.startContainer}>
            <Button
              text="Import List"
              onPress={importItems}
              color={themeStyles.colors.interactableBackground}
              containerStyle={{ width: 164 }}
            />

            <Button
              text="Add First Item"
              containerStyle={[styles.addItemButton, { width: 164 }]}
              onPress={promptAddItem}
            />
          </View>
        )}

        {isListAvailable && (
          <Bubble
            onPress={promptAddItem}
            color="#53D6FF"
            positionStyle={{ right: 12, bottom: 10 }}
          >
            <Ionicons name="add-outline" size={32} color="white" />
          </Bubble>
        )}

        {isListAvailable && !selectionModalVisible && (
          <Bubble
            onPress={() => setSelectionModalVisible(true)}
            positionStyle={{ left: 12, bottom: 10 }}
          >
            <Ionicons
              name="ellipsis-horizontal"
              size={32}
              color={themeStyles.colors.interactableText}
            />
          </Bubble>
        )}

        <BubbleModal
          visible={selectionModalVisible}
          positionStyle={{ left: 12, bottom: 72 + 32 }}
          onPressOut={cancelSelectionModal}
        >
          <View style={styles.moreContainer}>
            <TouchableOpacity
              style={styles.moreOption}
              onPress={onAddUpdateInventoryPress}
            >
              <Text>Update Inventory</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreOption}>
              <Text>Clear List</Text>
            </TouchableOpacity>
          </View>
        </BubbleModal>

        <UpdateInventoryModal
          visible={updateInventoryModalVisible}
          onCancel={() => setUpdateInventoryModalVisible(false)}
          onSubmit={sendItemsToInventory}
        />

        <BottomModal
          transparent
          visible={additemModal}
          onConfirm={isListAvailable ? addToList : createList}
          onCancel={cancelAdd}
          title="Add Item"
        >
          <View style={styles.addInputContainer}>
            <Input
              placeholder="Food Name"
              style={styles.addModalInput}
              onChangeText={(food) => setItemToAdd(food)}
            />
            <Input
              placeholder="Amount"
              style={styles.addModalInput}
              onChangeText={(amount) => setAmountToAdd(amount)}
            />
          </View>
        </BottomModal>
      </SafeAreaView>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerText: {
    fontSize: 20,
    marginTop: 10,
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1.3,
  },
  importButton: {
    backgroundColor: "#F2F2F2",
    padding: "2%",
    margin: "10%",
  },
  startContainer: {
    margin: 20,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    gap: 12,
  },
  addItemButton: {
    borderColor: themeStyles.colors.uninteractableText,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 3,
  },
  additemModalContainer: {
    marginTop: "100%",
    height: "30%",
    backgroundColor: "#4D8AFF",
    borderColor: "grey",
    borderWidth: 5,
    borderRadius: 5,
    padding: 20,
    justifyContent: "center",
  },
  addModalTitle: {
    fontSize: 24,
  },
  addInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  addModalButtonsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
  },
  addModalInput: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 5,
    marginHorizontal: 2,
  },
  listContainer: {
    marginVertical: 12,
    flex: 10,
  },
  moreContainer: {
    backgroundColor: "#F2F2F2",
    padding: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 128,
  },
  moreOption: {
    padding: 2,
    height: 48,
    display: "flex",
    justifyContent: "center",
  },
  updateInventoryModal: {
    alignSelf: "center",
    marginVertical: "50%",
    backgroundColor: "#F2F2F2",
    height: "50%",
    width: "70%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    padding: "5%",
  },
});

export default ShoppingListPage;
