import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import moment from "moment";
import Navbar from "./Navbar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import InventoryContext from "../context/inventory-context";
import UserContext from "../context/user-context";
import { getAllItems } from "../api/inventory-api";

const categories = ["Dairy", "Fresh Produce", "Canned", "Fruits"];

const CategoryMenu = ({ selectedCategory, onSelectCategory }) => (
  <FlatList
    horizontal
    data={categories}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => onSelectCategory(item)}
      >
        <Text
          style={item === selectedCategory ? styles.categoryItemActive : null}
        >
          {item}
        </Text>
      </TouchableOpacity>
    )}
    keyExtractor={(item) => item}
    showsHorizontalScrollIndicator={false}
    style={styles.categoryMenu}
  />
);

const PantryItem = ({ name, expiration, image, quantity, unit }) => (
  <View style={styles.pantryItem}>
    <View>
      <Text style={styles.itemName}>{name}</Text>
      <Text>
        {quantity} {unit}
      </Text>
    </View>
    {expiration && (
      <View style={styles.expirationIndicator}>
        <Text style={[styles.expirationText, { fontSize: 9 }]}>exp.</Text>
        <Text style={styles.expirationText}>{expiration}</Text>
      </View>
    )}
  </View>
);

const PantryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [items, setItems] = useState([]);
  const { userId } = useContext(UserContext);
  const refreshItems = useCallback(() => {
    getAllItems(userId)
      .then((data) => {
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
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>my items</Text>
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={36}
              style={styles.searchButton}
            />
          </TouchableOpacity>
        </View>
        <CategoryMenu
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <FlatList
          data={items}
          renderItem={({ item }) => <PantryItem {...item} />}
          keyExtractor={(item) => item.id}
          style={styles.pantryList}
          ListEmptyComponent={
            <Text style={styles.emptyComponent}>
              No items in your inventory. Add some through Alexa.
            </Text>
          }
        />
      </SafeAreaView>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
  },
  header: {
    fontSize: 32,
    fontWeight: "500",
    padding: 20,
    textAlign: "center",
    color: "#957E51",
    paddingRight: 175,
  },
  searchButton: {
    alignItems: "center",
    padding: 20,
    color: "#957E51",
  },
  categoryMenu: {
    flexDirection: "row",
    color: "#4B5E4C",
    borderColor: "#4B5E4C",
    maxHeight: 40,
    borderBottomWidth: 1,
  },
  categoryItem: {
    padding: 10,
    borderRadius: 10,
    color: "#4B5E4C",
    height: 40,
  },
  categoryItemActive: {
    backgroundColor: "#4B5E4C",
    borderRadius: 10,
    color: "#fff",
    paddingHorizontal: 10,
  },
  pantryList: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "column",
  },
  columnWrapper: {
    color: "#4B5E4C",
  },
  pantryItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    borderColor: "#4B5E4C",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eee",
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    marginVertical: 4,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  expirationIndicator: {
    position: "absolute",
    right: 0,
    backgroundColor: "white",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ff6e6e",
    elevation: 4,
    zIndex: 4,
  },
  expirationText: {
    color: "#ff6e6e",
    fontWeight: "bold",
    elevation: 4,
    zIndex: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  emptyComponent: {},
});

export default PantryPage;
