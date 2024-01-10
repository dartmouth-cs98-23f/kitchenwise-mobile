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
import { useCallback, useContext, useEffect, useState } from "react";
import LoginButton from "../login_components/LoginButton";
import UserContext from "../../context/user-context";
import { saveRecipe, unsaveRecipe } from "../../api/recipe-api";
import RecipeContext from "../../context/recipe-context";

const RecipeModal = (props) => {
  const { spoonacularId } = props.recipe;
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState("Ingredients");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [stageList, setStageList] = useState([]);
  const { userId } = useContext(UserContext);
  const { savedRecipeIds, refreshSavedRecipes } = useContext(RecipeContext);
  const onSave = useCallback(() => {
    setButtonDisabled(true);
    saveRecipe(userId, spoonacularId).finally(() =>
      refreshSavedRecipes().finally(() => {
        setButtonDisabled(false);
      })
    );
  }, [userId, props]);
  const onUnsave = useCallback(() => {
    setButtonDisabled(true);
    unsaveRecipe(userId, savedRecipeIds[spoonacularId]).finally(() =>
      refreshSavedRecipes().finally(() => {
        setButtonDisabled(false);
      })
    );
  }, [userId, props]);
  useEffect(() => {
    const newStageList = [];
    if (!props?.recipe?.stages) return;
    for (const [stageName, steps] of Object.entries(props.recipe.stages)) {
      for (const step of steps) {
        newStageList.push(step.description);
      }
    }
    setStageList(newStageList);
  }, [setStageList, props.recipe]);
  const onIngredients = () => {
    setSelectedRecipeInfo("Ingredients");
  };
  const onCookware = () => {
    setSelectedRecipeInfo("Cookware");
  };
  const onProcedure = () => {
    setSelectedRecipeInfo("Procedure");
  };

  const renderInfo = (info, index = false) => {
    return (
      <View style={styles.listCard}>
        {index && <Text style={styles.indexText}>{info.index}</Text>}
        <Text style={styles.cardContentText}>{info.item}</Text>
      </View>
    );
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
          <View style={styles.saveButton}>
            {spoonacularId && (
              <LoginButton
                text={`${
                  spoonacularId in savedRecipeIds ? "Unsave" : "Save"
                } this Recipe`}
                isBlack
                onPress={spoonacularId in savedRecipeIds ? onUnsave : onSave}
                disabled={buttonDisabled}
              />
            )}
          </View>
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
            {props?.recipe?.ownedIngredients?.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.modalSubheader}>You have</Text>
                {/* //TODO : crosslist invenotry with recipe ingredients and render items the user currently has */}
                <FlatList
                  style={{ width: "100%" }}
                  data={props.recipe.ownedIngredients}
                  renderItem={renderInfo}
                  contentContainerStyle={styles.flatListContainer}
                />
              </View>
            )}
            {props?.recipe?.missingIngredients?.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text style={styles.modalSubheader}>You need</Text>
                {/* //TODO : Put items not in user inventory here with a todo list */}

                <FlatList
                  style={{ width: "100%" }}
                  data={props.recipe.missingIngredients}
                  renderItem={renderInfo}
                  contentContainerStyle={styles.flatListContainer}
                />
              </View>
            )}
          </>
        )}
        {selectedRecipeInfo === "Cookware" && (
          <>
            <FlatList
              style={{ width: "100%" }}
              data={props.recipe.equipment}
              renderItem={renderInfo}
              contentContainerStyle={styles.flatListContainer}
            />
          </>
        )}
        {selectedRecipeInfo === "Procedure" && (
          <>
            <FlatList
              style={{ width: "100%" }}
              data={stageList}
              renderItem={(item) => renderInfo(item, true)}
              contentContainerStyle={styles.flatListContainer}
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
    marginTop: 12,
    marginHorizontal: 12,
  },
  listCard: {
    borderRadius: 8,
    marginHorizontal: 24,
    marginVertical: 4,
    padding: 8,
    backgroundColor: "#eee",
    flexDirection: "row",
    // width: "95%",
    // alignItems: "center",
  },
  cardContentText: {
    paddingVertical: 4,
  },
  indexText: {
    marginRight: 8,
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 4,
  },
  flatListContainer: {
    // paddingBottom: 128,
  },
});

export default RecipeModal;
