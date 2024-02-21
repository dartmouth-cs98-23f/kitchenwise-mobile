import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
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
import { editFoodItem } from "../api/fooditem-api";

const PantryPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [selectedInventories, setSelectedInventories] = useState(new Set());
  const [deletingItem, setDeletingItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const { userId } = useContext(UserContext);
  const { userInventories } = useContext(InventoryContext);

  useEffect(() => {
    if (userInventories)
      setSelectedInventories(new Set(userInventories.map((inv) => inv.title)));
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
    newFilteredItems = newFilteredItems.filter((item) =>
      selectedInventories.has(item.inventoryTitle)
    );
    setFilteredItems(newFilteredItems);
  }, [items, selectedInventories, searchText]);
  const onInventorySelect = useCallback((inventoryName) => {
    setSelectedInventories((prev) => {
      prev.add(inventoryName);
      return prev;
    });
  }, []);
  const onInventoryDeselect = useCallback((inventoryName) => {
    setSelectedInventories((prev) => {
      prev.delete(inventoryName);
      return prev;
    });
  }, []);

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
              "Vegetarian",
              "Dairy",
              "Fruit",
              "Meat",
              "Vegetables",
              "Cereal",
              "Dessert",
              "Sauces",
              "Condiments",
            ]}
            selectedItems={[]}
            selectedColor="#466646"
            width={80}
          />
          {userInventories && (
            <PillRow
              items={userInventories.map((inv) => inv.title)}
              selectedItems={userInventories
                .map((inv) => inv.title)
                .filter((name) => selectedInventories.has(name))}
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
              No items in your inventory. Add some through Alexa.
            </Text>
          }
        />
        <DeleteModal
          visible={deletingItem != null}
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
      </SafeAreaView>
      <VoiceBubble />
      <AddBubble />
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
});

export default PantryPage;
