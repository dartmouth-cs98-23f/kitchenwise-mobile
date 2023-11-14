import { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/login_components/LoginScreen";
import MainHomePage from "./navigation/MainHomePage";
import ProfileScreen from "./components/profile_components/ProfileScreen";
import PantryPage from "./navigation/PantryPage";
import InventoryContext, {
  defaultInventoryContext,
} from "./context/inventory-context";
import UserContext, { defaultUserContext } from "./context/user-context";
import RecipeContext, { defaultRecipeContext } from "./context/recipe-context";
import { getUserInventories } from "./api/inventory-api";
import RevisionModal from "./components/modals/RevisionModal";
import { getSavedRecipes } from "./api/recipe-api";

const Stack = createNativeStackNavigator();

export default function App() {
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
            <RevisionModal />
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={LoginScreen}
                  options={{ title: "Welcome", headerShown: false }}
                />
                <Stack.Screen
                  name="MainHomePage"
                  component={MainHomePage}
                  options={{
                    title: "Main Home Page",
                    headerBackVisible: false,
                    headerShown: false,
                    animation: "none",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={{
                    headerBackVisible: false,
                    animation: "none",
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="Pantry"
                  component={PantryPage}
                  options={{
                    headerBackVisible: false,
                    animation: "none",
                    headerShown: false,
                  }}
                />
                {/* //add stack screens here like: <Stack.Screen name="Name" component={ScreenName} /> */}
              </Stack.Navigator>
            </NavigationContainer>
          </RecipeContext.Provider>
        </InventoryContext.Provider>
      </UserContext.Provider>
    </>
  );
}
