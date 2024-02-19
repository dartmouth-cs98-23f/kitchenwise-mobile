import { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import LoginScreen from "./components/login_components/LoginScreen";
import ProfilePage from "./navigation/ProfilePage";
import PantryPage from "./navigation/PantryPage";
import ShoppingListPage from "./navigation/ShoppingListPage";
import NarrationPage from "./navigation/NarrationPage";
import InventoryContext, {
  defaultInventoryContext,
} from "./context/inventory-context";
import UserContext, { defaultUserContext } from "./context/user-context";
import RecipeContext, { defaultRecipeContext } from "./context/recipe-context";
import { getUserInventories } from "./api/inventory-api";
import RevisionModal from "./components/modals/RevisionModal";
import { getSavedRecipes } from "./api/recipe-api";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Lato: require("./assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("./assets/fonts/Lato-Bold.ttf"),
    Inter: require("./assets/fonts/Inter-Regular.ttf"),
  });
  const [userInventories, setUserInventories] = useState(
    defaultInventoryContext.userInventories
  );

  const [userId, setUserId] = useState(defaultUserContext.userId);
  useEffect(() => {
    if (userId)
      getUserInventories(userId).then((inventories) => {
        if (inventories) {
          setUserInventories(inventories);
        }
      });
  }, [userId, setUserInventories]);

  const [savedRecipeIds, setSavedRecipeIds] = useState(
    defaultRecipeContext.savedRecipeIds
  );
  const refreshSavedRecipes = useCallback(async () => {
    const parsedRecipes = (await getSavedRecipes(userId)).map((rec) => ({
      ...rec,
      id: rec._id,
    }));
    setSavedRecipeIds(
      parsedRecipes.reduce((prev, curr) => {
        return { ...prev, [curr.spoonacularId]: curr.id };
      }, {})
    );
    return parsedRecipes;
  }, [setSavedRecipeIds, userId]);
  useEffect(() => {
    refreshSavedRecipes().then();
  }, [refreshSavedRecipes]);

  return (
    <>
      <UserContext.Provider value={{ userId, setUserId }}>
        <InventoryContext.Provider
          value={{ userInventories, setUserInventories }}
        >
          <RecipeContext.Provider
            value={{ savedRecipeIds, setSavedRecipeIds, refreshSavedRecipes }}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Home"
                    component={LoginScreen}
                    options={{ title: "Welcome", headerShown: false }}
                  />
                  <Stack.Screen
                    name="Profile"
                    component={ProfilePage}
                    options={{
                      title: "",
                      headerBackVisible: false,
                      animation: "none",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Pantry"
                    component={PantryPage}
                    options={{
                      title: "",
                      headerBackVisible: false,
                      animation: "none",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="ShoppingList"
                    component={ShoppingListPage}
                    options={{
                      title: "",
                      headerBackVisible: false,
                      animation: "none",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Narration"
                    component={NarrationPage}
                    options={{
                      title: "",
                      headerBackVisible: false,
                      animation: "none",
                      headerShown: false,
                    }}
                  />
                  {/* //add stack screens here like: <Stack.Screen name="Name" component={ScreenName} /> */}
                </Stack.Navigator>
              </NavigationContainer>
            </GestureHandlerRootView>
          </RecipeContext.Provider>
        </InventoryContext.Provider>
      </UserContext.Provider>
    </>
  );
}
