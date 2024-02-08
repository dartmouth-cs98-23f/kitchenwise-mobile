import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import themeStyles from "../styles";

import Navbar from "./Navbar";
import SearchBar from "../components/pantry_components/SearchBar";

const ShoppingListItem = ({ name, amount }) => {
  return (
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemText}>{name}</Text>
      <View style={styles.listItemRight}>
        <Text style={styles.listItemText}>{amount || "1"}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipse-outline" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ShoppingListPage = () => {
  const [dairyItems, setDairyItems] = useState(["Item1", "item2"]);

  const updateList = (item) => {
    setDairyItems([...dairyItems, item]);
  };

  //TODO: pull in the recipes from the back end, should each category be dynamic?
  return (
    <>
      <SafeAreaView style={themeStyles.components.screenContainer}>
        <Text style={[themeStyles.text.h1, { marginBottom: 8 }]}>
          Your Shopping List
        </Text>
        <SearchBar />
        <View style={{ marginTop: 12 }}>
          <Text style={themeStyles.text.h3}>Dairy</Text>
          <View style={styles.line} />
          {dairyItems.map((item) => (
            <ShoppingListItem name={item} />
          ))}

          <Text style={themeStyles.text.h3}>Deli</Text>
          <View style={styles.line} />
          {dairyItems.map((item) => (
            <ShoppingListItem name={item} />
          ))}

          <Text style={themeStyles.text.h3}>Produce</Text>
          <View style={styles.line} />
          {dairyItems.map((item) => (
            <ShoppingListItem name={item} />
          ))}

          <Text style={themeStyles.text.h3}>Meat & Fish</Text>
          <View style={styles.line} />
          {dairyItems.map((item) => (
            <ShoppingListItem name={item} />
          ))}
          <Text style={themeStyles.text.h3}>Bakery</Text>
          <View style={styles.line} />
          {dairyItems.map((item) => (
            <ShoppingListItem name={item} />
          ))}

          <Text style={themeStyles.text.h3}>Household</Text>
          <View style={styles.line} />

          {dairyItems.map((item) => (
            <ShoppingListItem name={item} />
          ))}
        </View>
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
});

export default ShoppingListPage;
