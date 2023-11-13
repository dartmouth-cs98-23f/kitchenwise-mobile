import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useContext, useState } from "react";
import LoginButton from "../login_components/LoginButton";
import UserContext from "../../context/user-context";
import { saveRecipe } from "../../api/recipe-api";

const RecipeModal = (props) => {
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState("Ingredients");
  const { userId } = useContext(UserContext);
  console.log(props.recipe);
  const onSave = useCallback(() => {
    saveRecipe(userId, props.recipe.spoonacularId);
  }, [userId, props]);

  const onIngredients = () => {
    setSelectedRecipeInfo("Ingredients");
  };
  const onCookware = () => {
    setSelectedRecipeInfo("Cookware");
  };
  const onProcedure = () => {
    setSelectedRecipeInfo("Procedure");
  };

  const renderInfo = (info) => {
    return <Text>{info.item}</Text>;
  };

  return (
    <Modal visible={props.modalState} animationType="slide" transparent={false}>
      <View style={styles.recipeModalContainer}>
        <View>
          <Image style={styles.image} source={{ uri: props.recipe.image }} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={props.backFunction}>
            <Ionicons
              name="arrow-back-outline"
              size={36}
              style={styles.backButton}
            />
          </TouchableOpacity>

          <Text style={styles.title}>{props.recipe.title}</Text>
          {props.recipe.spoonacularId && (
            <LoginButton
              text="Save this Recipe"
              isBlack
              style={styles.saveButton}
              onPress={onSave}
            />
          )}
          <View style={styles.recipeInfoContainer}>
            <TouchableOpacity
              onPress={onIngredients}
              style={
                selectedRecipeInfo === "Ingredients"
                  ? styles.recipeInfoTouchable
                  : {}
              }
            >
              <Text
                style={
                  selectedRecipeInfo === "Ingredients"
                    ? { color: "white" }
                    : { color: "#957E51" }
                }
              >
                Ingredients
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCookware}
              style={
                selectedRecipeInfo === "Cookware"
                  ? styles.recipeInfoTouchable
                  : {}
              }
            >
              <Text
                style={
                  selectedRecipeInfo === "Cookware"
                    ? { color: "white" }
                    : { color: "#957E51" }
                }
              >
                Cookware
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onProcedure}
              style={
                selectedRecipeInfo === "Procedure"
                  ? styles.recipeInfoTouchable
                  : {}
              }
            >
              <Text
                style={
                  selectedRecipeInfo === "Procedure"
                    ? { color: "white" }
                    : { color: "#957E51" }
                }
              >
                Procedure
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {selectedRecipeInfo === "Ingredients" && (
          <>
            <View>
              <Text style={styles.modalSubheader}>You have</Text>
              {/* //TODO : crosslist invenotry with recipe ingredients and render items the user currently has */}
              <FlatList
                style={{ width: "100%" }}
                data={props.recipe.ingredients}
                renderItem={renderInfo}
              />
            </View>
            <View>
              <Text style={styles.modalSubheader}>You need</Text>
              {/* //TODO : Put items not in user inventory here with a todo list */}
              <FlatList></FlatList>
            </View>
          </>
        )}
        {selectedRecipeInfo === "Cookware" && (
          <>
            <FlatList
              style={{ width: "100%" }}
              data={props.recipe.equipment}
              renderItem={renderInfo}
            />
          </>
        )}
        {selectedRecipeInfo === "Procedure" && (
          <>
            <FlatList
              style={{ width: "100%" }}
              data={props.recipe.steps}
              renderItem={renderInfo}
            />
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  recipeModalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#f8f8f8",
    paddingBottom: 60, // Add padding to avoid overlap with the Navbar
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 4,
  },
  modalSubheader: {
    color: "#957E51",
    fontSize: 20,
    fontWeight: "600",
    margin: "5%",
  },
  backButton: {
    color: "#957E51",
    marginLeft: "5%",
    marginTop: "2%",
  },
  title: {
    alignSelf: "center",
    fontSize: 28,
  },
  recipeInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "2%",
    alignItems: "center",
  },
  recipeInfoTouchable: {
    backgroundColor: "#957E51",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#957E51",
    padding: ".5%",
  },
  saveButton: {
    marginHorizontal: 12,
    padding: 0,
  },
});

export default RecipeModal;
