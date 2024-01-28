import React, { useState } from "react";
import Navbar from "./Navbar";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';




const ShoppingListPage = () => { 
  const [dairyItems, setDairyItems] = useState(['Item1', "item2"]);  

  const updateList = (item) => {
    setDairyItems([...dairyItems, item]);
  }


  //TODO: pull in the recipes from the back end, should each category be dynamic? 
  return (
    <>
      <SafeAreaView style={styles.listContainer}>
      <Text style={styles.title}>Your Shopping List</Text>
      <TextInput 
        style={styles.searchBar} 
        placeholder="Search"
      >
      </TextInput>
      <View>
          <Text style={styles.headerText}>Dairy</Text>
          <View style={styles.line}/>
          <FlatList 
          data={dairyItems}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
               <Text style={styles.listItemText}>{item}</Text>
                <View style={styles.listItemRight}>
                  <Text style={styles.listItemText}>1 amount</Text>
                  <TouchableOpacity>
                    <Ionicons name="ellipse-outline" size={30} />
                  </TouchableOpacity>
                
                </View>
            </View>
          )}
          />

          <Text style={styles.headerText}>Deli</Text>
          <View style={styles.line}/>
          <FlatList 
          data={dairyItems}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
                <Text style={styles.listItemText}>{item}</Text>
                <View style={styles.listItemRight}>
                  <Text style={styles.listItemText}>1 amount</Text>
                  <Ionicons name="ellipse-outline" size={30} />
                </View>
            </View>
          )}
          />

          <Text style={styles.headerText}>Produce</Text>
          <View style={styles.line}/>
          <FlatList 
          data={dairyItems}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
                <Text style={styles.listItemText}>{item}</Text>
                <View style={styles.listItemRight}>
                  <Text style={styles.listItemText}>1 amount</Text>
                  <Ionicons name="ellipse-outline" size={30} />
                </View>
            </View>
          )}
          />

           <Text style={styles.headerText}>Meat & Fish</Text>
          <View style={styles.line}/>
          <FlatList 
          data={dairyItems}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
                <Text style={styles.listItemText}>{item}</Text>
                <View style={styles.listItemRight}>
                  <Text style={styles.listItemText}>1 amount</Text>
                  <Ionicons name="ellipse-outline" size={30} />
                </View>
            </View>
          )}
          />

          <Text style={styles.headerText}>Bakery</Text>
          <View style={styles.line}/>
          <FlatList 
          data={dairyItems}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
                <Text style={styles.listItemText}>{item}</Text>
                <View style={styles.listItemRight}>
                  <Text style={styles.listItemText}>1 amount</Text>
                  <Ionicons name="ellipse-outline" size={30} />
                </View>
            </View>
          )}
          />

          <Text style={styles.headerText}>Household</Text>
          <View style={styles.line}/>
          <FlatList 
          data={dairyItems}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
                <Text style={styles.listItemText}>{item}</Text>
                <View style={styles.listItemRight}>
                  <Text style={styles.listItemText}>1 amount</Text>
                  <Ionicons name="ellipse-outline" size={30} />
                </View>
            </View>
          )}
          />
        </View>

      </SafeAreaView>
      <Navbar/>
    </>
  )
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: "5%"
  },
  searchBar: {
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginRight: "5%",
    borderRadius: 10,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerText: {
    fontSize: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 40,
    marginVertical: 10,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 3,
  },
  listItemText: {
    fontSize: 16,
    marginHorizontal: 10
  },
  listItemRight: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});

export default ShoppingListPage;