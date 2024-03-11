import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";

import Navbar from "./Navbar";
import themeStyles from "../styles";
import UserContext from "../context/user-context";
import { getAllItems } from "../api/inventory-api";
import PantryItem from "../components/pantry_components/PantryItem";
import SearchBar from "../components/pantry_components/SearchBar";
import PillRow from "../components/pantry_components/PillRow";
import VoiceBubble from "../components/pantry_components/VoiceBubble";
import AddBubble from "../components/pantry_components/AddBubble";
import InventoryContext from "../context/inventory-context";
import DeleteModal from "../components/pantry_components/DeleteModal";
import EditModal from "../components/pantry_components/EditModal";
import { createRemoveAction } from "../api/removeaction-api";
import { showMessage } from "react-native-flash-message";
import { addFoodItem, editFoodItem } from "../api/fooditem-api";
import BubbleModal from "../components/modals/BubbleModal";
import { useNavigation } from "@react-navigation/native";

const PantryPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [selectedInventories, setSelectedInventories] = useState([]);
  const [deletingItem, setDeletingItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [creatingItem, setCreatingItem] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState(["All"]);
  const { userId } = useContext(UserContext);
  const { userInventories } = useContext(InventoryContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (userInventories && userInventories.length > 0)
      setSelectedInventories([userInventories[0].title]);
  }, [userInventories]);

  const refreshItems = useCallback(() => {
    getAllItems(userId)
      .then((data) => {
        // Data passes "_id": (String), "expirationDate" (optional Date?), "name": (String), "quantity": (int), "tags": (List), "unit": (String)
        setItems(
          data.map((item) => ({
            ...item,
            id: item._id,
            expiration: item?.expirationDate
              ? moment.utc(item?.expirationDate).format("MM/DD")
              : null,
          }))
        );
      })
      .catch((err) => {
        console.log("Inventory polling failed - server not online");
      });
  }, [userId, setItems]);

  useEffect(() => {
    // TODO: this is horrible and must be replaced next term
    refreshItems();
    const interval = setInterval(refreshItems, 2500);
    return () => clearInterval(interval);
  }, [userId, refreshItems]);

  useEffect(() => {
    let newFilteredItems = items;
    if (searchText)
      newFilteredItems = newFilteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredItems(newFilteredItems);
    }, [items, searchText]);

  useEffect(() => {
    let newFilteredItems = items;
    if (selectedInventories && selectedInventories.length > 0) {
      newFilteredItems = newFilteredItems.filter((item) =>
        selectedInventories.includes(item.inventory)
      );
    }

    if (selectedTags.length && !selectedTags.includes("All")) {
      newFilteredItems = newFilteredItems.filter((item) =>
        item.tags.some((tag) => selectedTags.includes(tag))
      );
    }
    setFilteredItems(newFilteredItems);
  }, [items, selectedTags, selectedInventories]);
  
  const onInventorySelect = useCallback((inventoryName) => {
    setSelectedInventories((prev) => [inventoryName]);
  }, []);
  
  const onInventoryDeselect = useCallback((inventoryName) => {
    setSelectedInventories((prev) => prev.filter((name) => name !== inventoryName));
  }, []);

  const onTagSelect = useCallback(
    (tag) => {
      setSelectedTags((prevTags) => {
        if (prevTags.includes(tag)) {
          return prevTags.filter((prevTag) => prevTag !== tag);
        } else {
          return [tag];
        }
      });
    },
    [setSelectedTags]
  );

  const onTagDeselect = useCallback((tag) => {
    setSelectedTags((prevTags) => {
      return prevTags.filter((prevTag) => prevTag !== tag);
    });
  }, [setSelectedTags]);

  const onSearchChange = useCallback((newSearchText) => {
    if (newSearchText && newSearchText.length > 0) setSearchText(newSearchText);
    else setSearchText(null);
  }, []);

  const onBeginDelete = useCallback(
    (foodItem) => {
      setDeletingItem(foodItem);
    },
    [setDeletingItem]
  );

  const onConfirmDelete = useCallback(() => {
    createRemoveAction(deletingItem, deletingItem.inventoryId, userId)
      .then(() => {
        refreshItems();
      })
      .catch((err) => {
        console.error(err);
        showMessage({
          message: "Error",
          description: "",
          type: "danger",
        });
      })
      .finally(() => {
        setDeletingItem(null);
      });
  }, [deletingItem, userId, refreshItems, setDeletingItem]);

  const onBeginEdit = useCallback(
    (foodItem) => {
      setEditingItem(foodItem);
    },
    [setEditingItem]
  );

  const onConfirmEdit = useCallback(
    (newItem) => {
      editFoodItem(editingItem.inventoryId, editingItem._id, newItem)
        .then(() => {
          refreshItems();
        })
        .catch((err) => {
          console.error(err);
          showMessage({
            message: "Error",
            description: "",
            type: "danger",
          });
        })
        .finally(() => {
          setEditingItem(null);
        });
    },
    [refreshItems, editingItem, setDeletingItem]
  );

  const onCreate = useCallback((foodItem) => {
    addFoodItem(userId, foodItem, foodItem.inventoryId)
      .then(() => {
        refreshItems();
      })
      .catch((err) => {
        console.error(err);
        showMessage({
          message: "Error",
          description: "",
          type: "danger",
        });
      })
      .finally(() => {
        setCreatingItem(false);
      });
  }, []);

  return (
    <>
      <SafeAreaView style={themeStyles.components.screenContainer}>
        <View style={{ display: "flex", gap: 8 }}>
          <View style={styles.headerContainer}>
            <Text style={[themeStyles.text.h1, styles.header]}>
              My Inventory
            </Text>
          </View>
          <SearchBar onChange={onSearchChange} />
          <PillRow
             items={[
              "All",
              "Bread",
              "Dried Fruits",
              "Gluten Free",
              "Milk, Eggs, Other Dairy",
              "Meat",
              "Bakery/Bread",
              "Seafood",
              "Cheese",
              "Produce",
              "Grilling supplies",
              "Cereal",
              "Nuts",
              "Meat",
              "Milk, Eggs, Other Dairy",
              "Online",
              "Bakery/Bread",
              "Not in Grocery Store/Homemade",
              "Pasta and Rice",
              "Beverages",
              "Baking",
              "Alcoholic Beverages",
              "Gluten Free",
              "Sweet Snacks",
              "Gourmet",
              "Tea and coffee",
              "Ethnic foods",
              "Savory Snacks",
              "Condiments",
              "Oil, Vinegar, Salad Dressing",
              "Nut butters, Jam, and Honey",
              "Frozen",
              "Canned and Jarred",
              "Refrigerated",
              "Canned and Jarred",                           
              "Spices and Seasonings",
              "Health Foods",
            ]}
            selectedItems={selectedTags}
            selectedColor="#466646"
            width={100}  // width should scale depending on length of tag string
            onItemSelect={onTagSelect}
            onItemDeselect={onTagDeselect}
            
          />
          {userInventories && (
            <PillRow
              items={userInventories.map((inv) => inv.title)}
              selectedItems={selectedInventories}
              selectedColor="#5C81A0"
              width={100}
              onItemSelect={onInventorySelect}
              onItemDeselect={onInventoryDeselect}
            />
          )}
          <View
            style={{
              borderBottomColor: "#D9D9D9",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 8,
            }}
          />
        </View>
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => (
            <PantryItem
              foodItem={item}
              onDelete={onBeginDelete}
              onEdit={onBeginEdit}
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.pantryList}
          ListEmptyComponent={
            <Text style={styles.emptyComponent}>
              No items in your inventory. Add some below.
            </Text>
          }
        />
        <DeleteModal
          visible={deletingItem != null}
          foodString={
            deletingItem &&
            (deletingItem?.unit
              ? `${deletingItem.quantity} ${deletingItem.unit} of ${deletingItem.name}`
              : `${deletingItem.quantity} ${deletingItem.name}`)
          }
          onSubmit={onConfirmDelete}
          onClose={() => setDeletingItem(null)}
        />
        <EditModal
          visible={editingItem != null}
          foodItem={editingItem}
          inventories={userInventories}
          onClose={() => setEditingItem(null)}
          onSubmit={onConfirmEdit}
        />
        <EditModal
          visible={creatingItem}
          inventories={userInventories}
          onClose={() => setCreatingItem(false)}
          onSubmit={onCreate}
          creating
        />
        <BubbleModal
          visible={addModalVisible}
          positionStyle={{ bottom: 72 + 32, left: 12 }}
          onPressOut={() => setAddModalVisible(false)}
        >
          <View style={styles.moreContainer}>
            <TouchableOpacity
              style={styles.moreOption}
              onPress={() => {
                setAddModalVisible(false);
                navigation.navigate("ReceiptScanner");
              }}
            >
              <Text>Scan Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.moreOption}
              onPress={() => {
                setCreatingItem(true);
                setAddModalVisible(false);
              }}
            >
              <Text>Manual Add</Text>
            </TouchableOpacity>
          </View>
        </BubbleModal>
      </SafeAreaView>
      <VoiceBubble />
      {!addModalVisible && (
        <AddBubble onPress={() => setAddModalVisible(true)} />
      )}
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  pantryScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 0,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
  },
  header: {
    flex: 1,
  },
  searchButton: {
    flex: 1,
    alignItems: "center",
    color: "#957E51",
  },
  pantryList: {},
  searchPanel: {
    backgroundColor: "#957E51",
    padding: "5%",
    width: "50%",
    height: "100%",
    borderRadius: 1,
    alignItems: "center",
  },
  filtersBlock: {},
  filters: {
    margin: 15,
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  filterSelect: {
    margin: 15,
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
});

export default PantryPage;
