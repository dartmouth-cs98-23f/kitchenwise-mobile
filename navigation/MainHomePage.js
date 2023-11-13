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
  TextInput,
  SafeAreaView,
} from "react-native";
import RecipeCard from "../components/recipeScreen_components/RecipeCard";
import Navbar from "./Navbar";
import { Ionicons } from "@expo/vector-icons";
import RevisionModal from "../components/modals/RevisionModal";
import RecipeModal from "../components/recipeScreen_components/RecipeModal";

const recipes = [
  {
    key: "1",
    title: "Ramen",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDhhy8ESPDa17yvq8uikiX6gjJXxy8eOXdg&usqp=CAU",
    difficulty: "Easy",
    cookTime: "30 min",
    equipment: ["Bowls", "Wooden Spoon", "Knife", "Cutting Board"],
    ingredients: ["Beef Stock", "Eggs", "Noodles", "Beef"],
    steps: [
      "Bring water to a rapid boil",
      "Add Vegetables",
      "Add Salt to taste",
    ],
  },
  {
    key: "2",
    title: "Strawberry Parfait",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVTeQYk3K-xm33ZBXYvUXzeWgIXFVynKg3Gw&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
    equipment: ["Bowls", "Wooden Spoon", "Knife", "Cutting Board"],
  },
  {
    key: "3",
    title: "Burger Supreme",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy5bLTDIaGCQWxp14-4cy2FWzDt59LOTaQCQ&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
    equipment: ["Bowls", "Wooden Spoon", "Knife", "Cutting Board"],
  },
  {
    key: "4",
    title: "Waffles",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQam75tTNPk7iik2UnZQQdrmEp4rnG_U_dyWw&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
    equipment: ["Bowls", "Wooden Spoon", "Knife", "Cutting Board"],
  },
  {
    key: "5",
    title: "Spaghetti 1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRd12T4dshafLbevnN-QYAwTn--GhmqjY_gg&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
    equipment: ["Bowls", "Wooden Spoon", "Knife", "Cutting Board"],
  },
  {
    key: "6",
    title: "Dessert",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CerEZRSBlTN-Ni75IBIMgtQ1SvND5cT3MA&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
    equipment: ["Bowls", "Wooden Spoon", "Knife", "Cutting Board"],
  },
  {
    key: "7",
    title: "Pizza",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lT10tINHblp_sllc_o3eMZU32tF6K6DNxA&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
    equipment: ["Bowls", "Wooden Spoon", "Knife", "Cutting Board"],
  },
  {
    key: "8",
    title: "Raspberry Cheesecake",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP1tVk95UBNwlif-CZ3SHtazYgdZm-1PjRBg&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
    equipment: ["Bowls", "Wooden Spoon", "Knife", "Cutting Board"],
  },
  {
    key: "9",
    title: "Sphagetti 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmV2fYhkn84wH8NkZgKneOs4nTY5Brsz5Uag&usqp=CAU",
    difficulty: "Medium",
    cookTIime: "45 min",
    equipment: ["Bowls", "Wooden Spoon", "Knife", "Cutting Board"],
  },
];

const MainHomePage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currRecipe, setCurrRecipe] = useState({});
  const [title, setCurrTitle] = useState("My Recipes");
  const [searchInput, setSearchInput] = useState("");

  const onRecipePress = (recipe) => {
    setModalVisible(true);
    setCurrRecipe(recipe);
    console.log(recipe); // could make a DB query request here
  };

  const onBackPress = () => {
    setModalVisible(false);
  };

  const onMyRecipesPress = () => {
    setCurrTitle("My Recipes");
  };

  const onSuggestedPress = () => {
    setCurrTitle("Suggested Recipes");
  };

  const renderItems = (itemData) => {
    if (title == "My Recipes" && searchInput === "") {
      return (
        <RecipeCard
          key={itemData.id}
          recipe={itemData.item}
          onPress={onRecipePress}
        />
      );
    } else if (
      itemData.item.title.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return (
        <RecipeCard
          key={itemData.id}
          recipe={itemData.item}
          onPress={onRecipePress}
        />
      );
    } else {
      // TODO: Need to send an API call to Spoonacular to search for suggested recipes, if the search is blank render randmon/top recupes, else send a request for recipes that match search
      return (
        <RecipeCard
          key={itemData.id}
          recipe={itemData.item}
          onPress={onRecipePress}
        />
      );
    }
  };

  console.log(searchInput);
  return (
    <>
      <StatusBar style="dark" />
      <RecipeModal
        modalState={modalVisible}
        backFunction={onBackPress}
        recipe={currRecipe}
      />
      <RevisionModal />
      <SafeAreaView style={styles.mainHomeContainer}>
        <View style={styles.mainHomeHeaderContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Type something..."
              value={searchInput}
              onChangeText={(text) => setSearchInput(text)}
            />
            <TouchableOpacity>
              <Ionicons
                name="search-outline"
                size={36}
                style={styles.searchButton}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={onMyRecipesPress}>
              <Text
                style={
                  title === "My Recipes"
                    ? styles.mainHomeTitle
                    : styles.titleSmall
                }
              >
                My Recipes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSuggestedPress}>
              <Text
                style={
                  title === "Suggested Recipes"
                    ? styles.mainHomeTitle
                    : styles.titleSmall
                }
              >
                Suggested Recipes
              </Text>
            </TouchableOpacity>
          </View>
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
      </SafeAreaView>

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
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    padding: "5%",
  },
  recipeListContainer: {
    width: "100%",
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
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: "5%",
  },
  searchInput: {
    flex: 1,
    height: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: "5%",
    borderRadius: 10,
  },
  searchButton: {
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "4%",
  },
  mainHomeTitle: {
    fontSize: 20,
    color: "#957E51",
    fontWeight: "600",
  },
  titleSmall: {
    fontSize: 15,
    color: "grey",
  },
});

export default MainHomePage;
