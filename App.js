import { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, processFontFamily } from "expo-font";

import LoginScreen from "./components/login_components/LoginScreen";
import MainHomePage from "./navigation/MainHomePage";
import ProfilePage from "./navigation/ProfilePage";
import PantryPage from "./navigation/PantryPage";
import ShoppingListPage from "./navigation/ShoppingListPage";
import InventoryContext, {
  defaultInventoryContext,
} from "./context/inventory-context";
import UserContext, { defaultUserContext } from "./context/user-context";
import RecipeContext, { defaultRecipeContext } from "./context/recipe-context";
import ShoppingListContext, { defaultShoppingContext } from "./context/shoppingList-context";
import { getUserShoppingLists } from "./api/shoppingList-api";
import { getUserInventories } from "./api/inventory-api";
import RevisionModal from "./components/modals/RevisionModal";
import { getSavedRecipes } from "./api/recipe-api";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Lato: require("./assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("./assets/fonts/Lato-Bold.ttf"),
  });
  const [userInventories, setUserInventories] = useState(
    defaultInventoryContext.userInventories
  );

  
  const [userShoppingLists, setUserShoppingLists] = useState(
    defaultShoppingContext.userShoppingLists
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

  useEffect(() => {
    if (userId)
      getUserShoppingLists(userId).then((shoppingLists) => {
        if (shoppingLists) {
          setUserShoppingLists(shoppingLists);
        }
      });
  }, [userId, setUserShoppingLists]);

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
            <ShoppingListContext.Provider 
              value={{ userShoppingLists, setUserShoppingLists }} 
            >
              <RevisionModal />
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
                  {/* //add stack screens here like: <Stack.Screen name="Name" component={ScreenName} /> */}
                </Stack.Navigator>
              </NavigationContainer>
            </ShoppingListContext.Provider>
          </RecipeContext.Provider>
        </InventoryContext.Provider>
      </UserContext.Provider>
    </>
  );
}
