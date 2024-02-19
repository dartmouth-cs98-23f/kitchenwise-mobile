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
import { createNewShoppingList, addItemToList, getUserShoppingListItems } from "../api/shoppingList-api";

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
  const [itemToAdd, setItemToAdd] = useState('');
  const [amountToAdd, setAmountToAdd] = useState('');

  const addToList = () => {
    addItemToList(userId, "list 1", itemToAdd, amountToAdd).then((data) => {
      setListItems(data.shoppingListItems);
    });
    setAddItemModal(false);
  };

  const promptAddItem = () => {
    setAddItemModal(true);
  }

  const cancelAdd = () => {
    setAddItemModal(false);
  }

  const createList = useCallback(() => {

    createNewShoppingList(userId, "list 1").then(() => {
      addItemToList(userId, "list 1", itemToAdd, amountToAdd).then((data) => {
        setListItems(data.shoppingListItems);
      })
    }

    )

    setAddItemModal(false);
    setListAvailable(true);
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
            <TouchableOpacity style={styles.importButton}>
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
              <TextInput placeholder="Food Name" style={styles.addModalInput} onChangeText={(food) => setItemToAdd(food)} />
              <TextInput placeholder="Amount" style={styles.addModalInput} onChangeText={(amount) => setAmountToAdd(amount)} />
            </View>
            <View style={styles.addModalButtonsContainer}>
              <TouchableOpacity onPress={isListAvailable ? addToList : createList}>
                <Text>CONFIRM</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelAdd}>
                <Text>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


       
        {isListAvailable &&
          <View style={styles.listContainer}>
            <Text style={themeStyles.text.h3}>Category</Text>
            <View style={styles.line} />
            {/* <>{listItems.map((item) => <ShoppingListItem name={item.title} amount={item.amount} key={item._id}/>)}</> */}
            <View style={styles.list}>
              <FlatList
                data={listItems}
                renderItem={({item}) => <ShoppingListItem name={item.title} amount={item.amount} key={item._id}/>}
                keyExtractor={item => item._id}
              />
            </View>
          </View>
        }
        <View style={styles.editContainer}>
          <TouchableOpacity onPress={promptAddItem}>
            <Ionicons name="add-circle" size={40} color="#53D6FF" />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={40} color="black" />
          </TouchableOpacity>
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
  editContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  importButton: {
    backgroundColor: '#F2F2F2',
    padding: "2%",
    margin: "10%",
  },
  startContainer: {
    margin: 20,
    alignItems: 'center',
    flex: 10
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
  addModalInput: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 5,
    marginHorizontal: 2
  },
  listContainer: {
    marginVertical: 12,
    flex: 10,

  },
  list: {


  }
});

export default ShoppingListPage;
