import React from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, Image, TouchableOpacity } from 'react-native';
import RecipeCard from '../components/recipeScreen_components/RecipeCard';
import Navbar from './Navbar';
import { Ionicons } from '@expo/vector-icons';

const recipes = [
  {
    key: '1',
    title: 'Recipe 1',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDhhy8ESPDa17yvq8uikiX6gjJXxy8eOXdg&usqp=CAU',
    difficulty: 'Easy',
    cookTime: '30 min',
  },
  {
    key: '2',
    title: 'Recipe 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVTeQYk3K-xm33ZBXYvUXzeWgIXFVynKg3Gw&usqp=CAU',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '3',
    title: 'Recipe 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy5bLTDIaGCQWxp14-4cy2FWzDt59LOTaQCQ&usqp=CAU',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '4',
    title: 'Recipe 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQam75tTNPk7iik2UnZQQdrmEp4rnG_U_dyWw&usqp=CAU',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '5',
    title: 'Recipe 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRd12T4dshafLbevnN-QYAwTn--GhmqjY_gg&usqp=CAU',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '6',
    title: 'Recipe 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CerEZRSBlTN-Ni75IBIMgtQ1SvND5cT3MA&usqp=CAU',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '7',
    title: 'Recipe 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lT10tINHblp_sllc_o3eMZU32tF6K6DNxA&usqp=CAU',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '8',
    title: 'Recipe 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP1tVk95UBNwlif-CZ3SHtazYgdZm-1PjRBg&usqp=CAU',
    difficulty: 'Medium',
    cookTIime: '45 min',
  },
  {
    key: '9',
    title: 'Recipe 2',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmV2fYhkn84wH8NkZgKneOs4nTY5Brsz5Uag&usqp=CAU',
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
    backgroundColor: '#fff'
  },
  mainHomeHeaderContainer: {
    flex: 2,
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
  },
  searchButton: {
    alignItems: 'center',
    marginRight: "10%"
  },
  
});

export default MainHomePage;
