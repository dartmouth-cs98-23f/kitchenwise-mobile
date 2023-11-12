import { React, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import RecipeCard from "../components/recipeScreen_components/RecipeCard";
import Navbar from "./Navbar";
import { Ionicons } from "@expo/vector-icons";
import RevisionModal from "../components/modals/RevisionModal";

const recipes = [
  {
    key: "1",
    title: "Recipe 1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDhhy8ESPDa17yvq8uikiX6gjJXxy8eOXdg&usqp=CAU",
    difficulty: "Easy",
    cookTime: "30 min",
  },
  {
    key: "2",
    title: "Recipe 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVTeQYk3K-xm33ZBXYvUXzeWgIXFVynKg3Gw&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
  },
  {
    key: "3",
    title: "Recipe 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy5bLTDIaGCQWxp14-4cy2FWzDt59LOTaQCQ&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
  },
  {
    key: "4",
    title: "Recipe 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQam75tTNPk7iik2UnZQQdrmEp4rnG_U_dyWw&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
  },
  {
    key: "5",
    title: "Recipe 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRd12T4dshafLbevnN-QYAwTn--GhmqjY_gg&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
  },
  {
    key: "6",
    title: "Recipe 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CerEZRSBlTN-Ni75IBIMgtQ1SvND5cT3MA&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
  },
  {
    key: "7",
    title: "Recipe 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lT10tINHblp_sllc_o3eMZU32tF6K6DNxA&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
  },
  {
    key: "8",
    title: "Recipe 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP1tVk95UBNwlif-CZ3SHtazYgdZm-1PjRBg&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
  },
  {
    key: "9",
    title: "Recipe 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmV2fYhkn84wH8NkZgKneOs4nTY5Brsz5Uag&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
  },
];

const MainHomePage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currRecipe, setCurrRecipe] = useState({});

  const onRecipePress = (recipe) => {
    setModalVisible(true);
    setCurrRecipe(recipe);
    console.log(recipe); // could make a DB query request here
  };

  const onBackPress = () => {
    setModalVisible(false);
  };

  const renderItems = (itemData) => {
    return (
      <RecipeCard
        key={itemData.id}
        recipe={itemData.item}
        onPress={onRecipePress}
      />
    );
  };

  return (
    <>
      <StatusBar style="dark" />

      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.recipeModalContainer}>
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons
              name="arrow-back-outline"
              size={36}
              style={styles.backButton}
            />
          </TouchableOpacity>
          <Image style={styles.image} source={{ uri: currRecipe.image }} />
          <Text style={styles.modalSubheader}> You have </Text>
          <FlatList></FlatList>
          <Text style={styles.modalSubheader}> You need </Text>
          <FlatList></FlatList>
        </View>
      </Modal>
      <RevisionModal />

      <View style={styles.mainHomeContainer}>
        <View style={styles.mainHomeHeaderContainer}>
          <Text style={styles.mainHomeTitle}>My Recipes</Text>
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={36}
              style={styles.searchButton}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.recipeListContainer}>
          <FlatList
            style={{ width: "100%" }}
            data={recipes}
            renderItem={renderItems}
            numColumns={2}
            alwaysBounceVertical={true}
          />
        </View>
      </View>

      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  mainHomeContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  mainHomeHeaderContainer: {
    // flex: 2,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  mainHomeTitle: {
    fontSize: 28,
    // fontWeight: 600,
    paddingLeft: "10%",
  },
  recipeListContainer: {
    width: "100%",
  },
  searchButton: {
    alignItems: "center",
    marginRight: "10%",
  },
  recipeModalContainer: {
    flex: 1,
    // backgroundColor: "yellow", for debugging
    justifyContent: "flex-start",
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60, // Add padding to avoid overlap with the Navbar
  },
  goBackButton: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 100,
    width: "50%",
    alignItems: "center",
  },
  goBackButtonText: {
    color: "#FFFFFF",
    // fontWeight: 400,
  },
  image: {
    width: "80",
    height: "30%",
    margin: 5,
  },
  backButton: {
    margin: "5%",
    marginTop: "10%",
    // backgroundColor: 'red', for debugging
  },
  modalSubheader: {
    color: "#353434d9",
    fontSize: 20,
    fontWeight: "600",
    margin: "5%",
  },
});

export default MainHomePage;
