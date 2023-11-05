import React from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, Image, TouchableOpacity } from 'react-native';
import RecipeCard from '../components/recipeScreen_components/RecipeCard';
import Navbar from './Navbar';
import { Ionicons } from '@expo/vector-icons';

const recipes = [
  {
    key: '1',
    title: 'Recipe 1',
    image: '../assets/flatlay-iron-skillet-with-meat-and-other-food.jpg',
    difficulty: 'Easy',
    cookTime: '30 min',
  },
  {
    key: '2',
    title: 'Recipe 2',
    image: '../assets/healthFood.jpg',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '3',
    title: 'Recipe 2',
    image: '../assets/healthFood.jpg',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '4',
    title: 'Recipe 2',
    image: '../assets/healthFood.jpg',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '5',
    title: 'Recipe 2',
    image: '../assets/healthFood.jpg',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '6',
    title: 'Recipe 2',
    image: '../assets/healthFood.jpg',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '7',
    title: 'Recipe 2',
    image: '../assets/healthFood.jpg',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '8',
    title: 'Recipe 2',
    image: '../assets/healthFood.jpg',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '9',
    title: 'Recipe 2',
    image: '../assets/healthFood.jpg',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  // Add more recipe data as needed
];

const MainHomePage = ({ navigation }) => {
 
  const renderItems = (itemData) => {
      return(
        <View key={itemData.id}>
          <RecipeCard recipe={itemData.item} />
        </View>
      )
  }
 
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.mainHomeContainer}>
        <View style={styles.mainHomeHeaderContainer}>
          <Text style={styles.mainHomeTitle} >My Recipes</Text>
          <Ionicons name="search-outline" size={36} style={styles.searchButton}/>
        </View>
        <View style={styles.recipeListContainer}>
          <FlatList data={recipes} renderItem = {renderItems} numColumns={2}/>
  
        </View>
      </View>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  mainHomeContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "red",
  
  },
  mainHomeHeaderContainer: {
    flex: 2,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  mainHomeTitle: {
    fontSize: 28,
    fontWeight: '600',
    paddingLeft: "10%",

  },
  recipeListContainer: {
    flex: 8,
    backgroundColor: "blue",
  },
  searchButton: {
    alignItems: 'center',
    marginRight: "10%"
  },
  
});

export default MainHomePage;
