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
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../context/user-context";
import { getAllItems } from "../api/inventory-api";
import PantryItem from "../components/pantry_components/PantryItem";
import LoginButton from "../components/login_components/LoginButton";
import AlexaButton from '../components/alexa_components/AlexaButton';

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
  }

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
      <SafeAreaView style={styles.pantryScreenContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>My Items</Text>
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={36}
              style={styles.searchButton}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={filterButtonHanlder} >
          <Ionicons 
          name="filter"
          size={24}
          style = {styles.filterButton}
          />
        </TouchableOpacity>
        <Modal 
          visible={modalVisible}
          transparent={true}
          animationType="fade"
        >
          <SafeAreaView style={styles.filterModalContainer}>
            <View style={styles.filtersPanel}>
              <View style={styles.filtersBlock}>
                <TouchableOpacity style={styles.filters}>
                  <Text>Filter 1</Text>
                  <Ionicons name="square-outline" size={18} style={styles.filterSelect}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filters}>
                  <Text>Filter 1</Text>
                  <Ionicons name="square-outline" size={18} style={styles.filterSelect}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filters}>
                  <Text>Filter 1</Text>
                  <Ionicons name="square-outline" size={18} style={styles.filterSelect}/>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={filterDoneHandler}><Text>Done</Text></TouchableOpacity>
              </View>
           
            </View>
          </SafeAreaView>
        </Modal>
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
        <AlexaButton />
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
  },
  headerContainer: {
    flexDirection: "row",
  },
  header: {
    flex: 1,
    fontSize: 32,
    fontWeight: "500",
    padding: 10,
    color: "#957E51",
    paddingLeft: 40,
  },
  searchButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    color: "#957E51",
  },
  pantryList: {
    paddingHorizontal: "5%",
    paddingVertical: 24,
  },
  filterButton: {
    color: "#957E51",
    alignItems: "center",
    paddingLeft: 40
  },
  filtersPanel: {
    backgroundColor: "#957E51",
    padding: "5%",
    width: "50%",
    height: "100%",
    borderRadius: 1,

    alignItems: "center"
  },
  filtersBlock: {
   marginTop: 50,
  },
  filters: {
    margin: 15,
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  filterSelect: {
    margin: 15,
  }
});

export default PantryPage;
