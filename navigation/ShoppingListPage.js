import React, { useCallback, useState, useContext } from "react";
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import themeStyles from "../styles";
import UserContext from "../context/user-context";
import Navbar from "./Navbar";
import SearchBar from "../components/pantry_components/SearchBar";
import { createNewShoppingList } from "../api/shoppingList-api";

const ShoppingListItem = ({ name, amount }) => {
  return (
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemText}>{name}</Text>
      <View style={styles.listItemRight}>
        <Text style={styles.listItemText}>{amount || "1"}</Text>
        <TouchableOpacity >
          <Ionicons name="ellipse-outline" size={30} />
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

  const addToList = (item) => {
    setListItems([...listItems, item]);
  };

  const promptAddItem = () => {
    setAddItemModal(true);
  }

  const cancelAdd = () => {
    setAddItemModal(false);
  }

  const createList = useCallback(() => {
    setListAvailable(true);

    createNewShoppingList(userId, "list 1").then((data) => {

      data.shoppingListItem.map((item) => { setDairyItems(item) });
      console.log(data);
    });
  });
  //TODO: pull in the recipes from the back end, should each category be dynamic?
  return (
    <>
      <SafeAreaView style={themeStyles.components.screenContainer}>
        <Text style={[themeStyles.text.h1, { marginBottom: 8 }]}>
          Your Shopping List
        </Text>
        <SearchBar />


        {!isListAvailable &&
          <View style={styles.startContainer}>
            <TouchableOpacity onPress={createList} style={styles.importButton}>
              <Text>Import List</Text>
            </TouchableOpacity>
            <Text>Or</Text>
            <TouchableOpacity onPress={promptAddItem} style={styles.importButton}>
              <Text >Add New Item</Text>
            </TouchableOpacity>
          </View>
        }

        <Modal transparent={true} visible={additemModal}>
          <View style={styles.additemModalContainer}>
            <Text style={styles.addModalTitle}>Add Item</Text>
            <View style={styles.addInputContainer}>
              <TextInput placeholder="Food Name" style={styles.addModalInput}/>
              <TextInput placeholder="Amount" style={styles.addModalInput}/>
            </View>

            <View style={styles.addModalButtonsContainer}>
              <TouchableOpacity>
                <Text>CONFIRM</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelAdd}>
                <Text>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        <ScrollView>
          {isListAvailable &&
            <View style={{ marginTop: 12 }}>
              <Text style={themeStyles.text.h3}>Category</Text>
              <View style={styles.line} />
              {dairyItems.map((item) => (
                <ShoppingListItem name={item} />
              ))}
            </View>
          }
        </ScrollView>


        <View style={styles.editContainer}>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={40} color="#53D6FF" />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={40} color="black" />
          </TouchableOpacity>
        </View>

        {/*
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
         */}
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
    justifyContent: "space-between"
  },
  importButton: {
    backgroundColor: '#F2F2F2',
    padding: "2%",
    margin: "10%",
  },
  startContainer: {
    margin: 20,
    alignItems: 'center'
  },
  additemModalContainer: {
    marginTop: "100%",
    height: "30%",
    backgroundColor: "#f7f9f9",
    borderColor: "grey",
    borderWidth: 5,
    borderRadius: 5,
    padding: 20,
    justifyContent: "center"
  },
  addModalTitle: {
    fontSize: 24,
  },
  addInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "15%"
  },
  addModalButtonsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-around"
  },
  addModalInput : {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 5,
    marginHorizontal: 2
  }
});

export default ShoppingListPage;
