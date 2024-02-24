import React, { useCallback, useState, useContext, useEffect } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import themeStyles from "../styles";
import UserContext from "../context/user-context";
import InventoryContext from "../context/inventory-context";
import Navbar from "./Navbar";
import SearchBar from "../components/pantry_components/SearchBar";
import {
  createNewShoppingList,
  addItemToList,
  getUserShoppingListItems,
  exportToShoppingList,
  importToShoppingList 
} from "../api/shoppingList-api";
import { shouldUseActivityState } from "react-native-screens";

const ShoppingListItem = ({ item, name, amount, selectItems }) => {
  const [isSelected, setIsSelected] = useState(false);

  const itemPressed = () => {
    selectItems(item);
    let toggle = isSelected ? false : true;
    setIsSelected(toggle);
  };

  let style = isSelected ? "ellipse" : "ellipse-outline";
  return (
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemText}>{name}</Text>
      <View style={styles.listItemRight}>
        <Text style={styles.listItemText}>{amount || "1"}</Text>
        <TouchableOpacity onPress={itemPressed}>
          <Ionicons name={style} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ShoppingListPage = () => {
  const { userId } = useContext(UserContext);
  const [listItems, setListItems] = useState([]);
  const [isListAvailable, setListAvailable] = useState(false);
  const [isListEmpty, setListEmpty] = useState(false);
  const [additemModal, setAddItemModal] = useState(false);
  const [itemToAdd, setItemToAdd] = useState("");
  const [amountToAdd, setAmountToAdd] = useState("");
  const [pendingDeletions, setPendingDeletions] = useState([]);                                           // list of all the items to be cleared or pushed to inventory clea
  const [selectionModal, setSelectionModal] = useState(false);
  const [updateInventoryModal, setUpdateInventoryModal] = useState(false);
  const { userInventories } = useContext(InventoryContext);
  const [listName, setListName] = useState('list 1')

  const addToList = () => {
    addItemToList(userId, listName, itemToAdd, amountToAdd).then((data) => {
      setListItems(data.shoppingListItems);
    });
    setAddItemModal(false);
  };

  const promptAddItem = () => {
    setAddItemModal(true);
  };

  const toggleSelection = () => {
    selectionModal ? setSelectionModal(false) : setSelectionModal(true);
  };

  const cancelAdd = () => {
    setAddItemModal(false);
  };

  const togglePendingDeletion = (item) => {
    const isItemInPendingDeletions = pendingDeletions.some(
      (pendingItem) => pendingItem.title === item.title && pendingItem.amount === item.amount
    );
  
    if (isItemInPendingDeletions) {
      // Remove the item from pendingDeletions
      const updatedPendingDeletions = pendingDeletions.filter(
        (pendingItem) => pendingItem.title !== item.title || pendingItem.amount !== item.amount
      );
      setPendingDeletions(updatedPendingDeletions);
    } else {
      // Add the item to pendingDeletions
      setPendingDeletions([...pendingDeletions, item]);
    }
  };



  const cancelSelectionModal = () => {
    setSelectionModal(false);
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

  const onAddUpdateInvenotryPress = () => {
    setUpdateInventoryModal(true);
  }
  const onCloseUpdateInvetoryModal = () => {
    setUpdateInventoryModal(false);
  }
  const sendItemsToInventory = useCallback((inv) => {
    exportToShoppingList(userId, listName, pendingDeletions, inv)
      .then(() => {
        setUpdateInventoryModal(false);
      })
      .catch((error) => {
        console.error('Error exporting items to inventory:', error);
      });
  }, [pendingDeletions]);
 
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
          console.error('Error importing items:', error.message);
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
    // TODO: this is horrible and must be replaced next term
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
        <SearchBar />

        {!isListAvailable && (
          <View style={styles.startContainer}>
            <TouchableOpacity style={styles.importButton} onPress={importItems}>
              <Text>Import List</Text>
            </TouchableOpacity>
            <Text>Or</Text>
            <TouchableOpacity
              onPress={promptAddItem}
              style={styles.importButton}
            >
              <Text>Add New Item</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal transparent={true} visible={additemModal}>
          <View style={styles.additemModalContainer}>
            <Text style={styles.addModalTitle}>Add Item</Text>
            <View style={styles.addInputContainer}>
              <TextInput
                placeholder="Food Name"
                style={styles.addModalInput}
                onChangeText={(food) => setItemToAdd(food)}
              />
              <TextInput
                placeholder="Amount"
                style={styles.addModalInput}
                onChangeText={(amount) => setAmountToAdd(amount)}
              />
            </View>
            <View style={styles.addModalButtonsContainer}>
              <TouchableOpacity
                onPress={isListAvailable ? addToList : createList}
              >
                <Text>CONFIRM</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelAdd}>
                <Text>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {isListAvailable && (
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
        )}

        <View style={styles.editContainer}>

          <TouchableOpacity onPress={promptAddItem}>
            <Ionicons name="add-circle" size={40} color="#53D6FF" />
          </TouchableOpacity>

          {!selectionModal && (
            <TouchableOpacity onPress={toggleSelection}>
              <MaterialCommunityIcons
                name="dots-horizontal-circle-outline"
                size={40}
                color="black"
              />
            </TouchableOpacity>
          )}

          {selectionModal && (
            <View style={styles.moreContainer}>
              <TouchableOpacity style={styles.moreOption} onPress={onAddUpdateInvenotryPress}>
                <Text>Update Inventory</Text>
              </TouchableOpacity>
              <TouchableOpacity styles={styles.moreOption}>
                <Text>Clear List</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.moreOption}
                onPress={cancelSelectionModal}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Modal visible={updateInventoryModal} transparent={true} animationType="slide">
          <SafeAreaView style={styles.updateInventoryModal}>
            <Text>Select an Inventory</Text>
            {userInventories.map((inv) => (
              <TouchableOpacity key={inv._id}
                onPress={() => sendItemsToInventory(inv)}
              >
                <Text>{inv.title}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={onCloseUpdateInvetoryModal}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>

      </SafeAreaView>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    // borderColor: "gray",
    // borderWidth: 1,
    // paddingHorizontal: 8,
    // paddingVertical: 8,
    // marginRight: "5%",
    // borderRadius: 10,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerText: {
    fontSize: 20,
    marginTop: 10,
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  listItemText: {
    fontSize: 16,
    fontFamily: "Lato",
  },
  listItemRight: {
    fontFamily: "Lato",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
    flex: 10,
  },
  additemModalContainer: {
    marginTop: "100%",
    height: "30%",
    backgroundColor: "#f7f9f9",
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
    marginVertical: "15%",
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
  },
  moreOption: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 2,
  },
  updateInventoryModal: {
    alignSelf: 'center',
    marginVertical: '50%',
    backgroundColor: '#F2F2F2',
    height: '50%',
    width: '70%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    padding: "5%"
  }
});

export default ShoppingListPage;
