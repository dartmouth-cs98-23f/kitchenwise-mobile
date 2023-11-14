import { React, useEffect, useState, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import RecipeCard from "../components/recipeScreen_components/RecipeCard";
import Navbar from "./Navbar";
import { Ionicons } from "@expo/vector-icons";
import RevisionModal from "../components/modals/RevisionModal";
import RecipeModal from "../components/recipeScreen_components/RecipeModal";
import {
  getSavedRecipes,
  getSuggestedRecipes,
  searchRecipes,
} from "../api/recipe-api";
import UserContext from "../context/user-context";
import RecipeContext from "../context/recipe-context";

const MainHomePage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currRecipe, setCurrRecipe] = useState({});
  const [title, setCurrTitle] = useState("Suggested Recipes");
  const [searchInput, setSearchInput] = useState("");
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const { userId } = useContext(UserContext);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { savedRecipeIds, setSavedRecipeIds, refreshSavedRecipes } =
    useContext(RecipeContext);

  useEffect(() => {
    if (title == "Suggested Recipes") {
      getSuggestedRecipes(userId).then((data) => {
        const parsedRecipes = data.map((rec) => ({ ...rec, id: rec._id }));
        setSuggestedRecipes(parsedRecipes);
        console.log(parsedRecipes);
      });
    }
  }, [userId, setSuggestedRecipes, title]);

  useEffect(() => {
    if (title == "My Recipes") {
      refreshSavedRecipes().then((recipes) => {
        setSavedRecipes(recipes);
      });
    }
  }, [userId, setSavedRecipes, refreshSavedRecipes, title]);

  const submitSearch = useCallback(() => {
    const trimmedInput = searchInput.trim();
    if (trimmedInput != "") {
      searchRecipes(userId, trimmedInput).then((recipes) => {
        setSuggestedRecipes(recipes);
      });
    }
  }, [searchInput]);

  const onRecipePress = (recipe) => {
    setModalVisible(true);
    setCurrRecipe(recipe);
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
    if (title == "My Recipes") {
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
          saved={
            itemData?.item?.spoonacularId &&
            itemData?.item?.spoonacularId in savedRecipeIds
          }
        />
      );
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <RecipeModal
        modalState={modalVisible}
        backFunction={onBackPress}
        recipe={currRecipe}
      />
      <SafeAreaView style={styles.mainHomeContainer}>
        <View style={styles.mainHomeHeaderContainer}>
          <View style={styles.titleContainer}>
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
          </View>
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
                onPress={submitSearch}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.recipeListContainer}>
          <FlatList
            style={{ width: "100%" }}
            data={
              title == "My Recipes"
                ? savedRecipes.filter((rec) => rec.title.includes(searchInput))
                : suggestedRecipes
            }
            renderItem={renderItems}
            numColumns={2}
            alwaysBounceVertical={true}
            ListEmptyComponent={
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text style={styles.emptyComponent}>No recipes found.</Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>

      <Navbar navigation={navigation} />
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
    gap: 24,
  },
  recipeListContainer: {
    width: "100%",
    flex: 1,
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
    // marginBottom: "5%",
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
    // marginTop: "4%",
  },
  mainHomeTitle: {
    fontSize: 20,
    color: "#957E51",
    fontWeight: "600",
  },
  titleSmall: {
    fontSize: 20,
    color: "grey",
  },
});

export default MainHomePage;
