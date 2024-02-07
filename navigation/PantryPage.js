import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import moment from "moment";
import Navbar from "./Navbar";
import themeStyles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../context/user-context";
import { getAllItems } from "../api/inventory-api";
import PantryItem from "../components/pantry_components/PantryItem";
import PantrySearchModal from "../components/pantry_components/PantrySearchModal";
import SearchBar from "../components/pantry_components/SearchBar";
import PillRow from "../components/pantry_components/PillRow";

const PantryPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState([]);
  const { userId } = useContext(UserContext);

  const filterButtonHanlder = () => {
    setModalVisible(true);
  };

  const filterDoneHandler = () => {
    setModalVisible(false);
  };

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

  return (
    <>
      <SafeAreaView style={themeStyles.components.screenContainer}>
        <View style={{ display: "flex", gap: 8 }}>
          <View style={styles.headerContainer}>
            <Text style={[themeStyles.text.h1, styles.header]}>
              My Inventory
            </Text>
          </View>
          <SearchBar />
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
            selectedItems={["Vegetarian", "Dairy", "Fruit"]}
            selectedColor="#466646"
            width={80}
          />
          <PillRow
            items={["Fridge", "Freezer", "Pantry", "Spice Cabinet"]}
            selectedItems={["Fridge", "Freezer", "Pantry"]}
            selectedColor="#5C81A0"
            width={100}
          />
          <View
            style={{
              borderBottomColor: "#D9D9D9",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 8,
            }}
          />
          <PantrySearchModal
            filterDoneHandler={filterDoneHandler}
            visible={modalVisible}
          />
        </View>
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
