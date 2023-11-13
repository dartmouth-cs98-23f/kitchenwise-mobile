import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
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

const PantryItem = ({ name, expiration, image }) => (
  <View style={styles.pantryItem}>
    {expiration && (
      <View style={styles.expirationIndicator}>
        <Text style={styles.expirationText}>{expiration}</Text>
      </View>
    )}
    <Image source={image} style={styles.itemImage} />
    <Text style={styles.itemName}>{name}</Text>
  </View>
);

const PantryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [items, setItems] = useState([]);
  const { userInventories } = useContext(InventoryContext);
  const { userId } = useContext(UserContext);
  useEffect(() => {
    getAllItems(userId).then((data) => {
      setItems(
        data.map((item) => ({
          id: item._id,
          name: item.name,
          expiration: item?.expirationDate?.toString(),
          image: require("../assets/flatlay-iron-skillet-with-meat-and-other-food.jpg"),
        }))
      );
    });
  }, [userId]);
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
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          style={styles.pantryList}
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
    paddingLeft: 30,
  },
  columnWrapper: {
    color: "#4B5E4C",
  },
  pantryItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    borderColor: "#4B5E4C",
    padding: 10,
    width: 150,
    height: 150,
    alignItems: "center",
    margin: 10,
    // elevation: 3,r
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
  },
  expirationText: {
    color: "#ff6e6e",
    fontWeight: "bold",
    elevation: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
});

export default PantryPage;
