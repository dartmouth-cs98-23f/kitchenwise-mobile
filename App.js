import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FlashMessage from "react-native-flash-message";
import CreateAccountScreen from "./navigation/SignUpScreen";
import LoginScreen from "./navigation/LoginPage";
import ProfilePage from "./navigation/ProfilePage";
import ForgotPasswordScreen from "./navigation/ForgotPasswordPage";
import PantryPage from "./navigation/PantryPage";
import StatisticsPage from "./navigation/StatisticsPage";
import ShoppingListPage from "./navigation/ShoppingListPage";
import NarrationPage from "./navigation/NarrationPage";
import InventoryContext, {
  defaultInventoryContext,
} from "./context/inventory-context";
import UserContext, { defaultUserContext } from "./context/user-context";
import ShoppingListContext, {
  defaultShoppingContext,
} from "./context/shoppingList-context";
import { getUserShoppingLists } from "./api/shoppingList-api";
import { getUserInventories } from "./api/inventory-api";

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
  return (
    <>
      <UserContext.Provider value={{ userId, setUserId }}>
        <InventoryContext.Provider
          value={{ userInventories, setUserInventories }}
        >
          <ShoppingListContext.Provider
            value={{ userShoppingLists, setUserShoppingLists }}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <FlashMessage position="top" />
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Home"
                    component={LoginScreen}
                    options={{ title: "Welcome", headerShown: false }}
                  />
                  <Stack.Screen
                    name="CreateAccount"
                    component={CreateAccountScreen}
                    options={{ title: "Create Account", headerShown: false }}
                  />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{ title: "forgotpassword", headerShown: false }}
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

                  <Stack.Screen
                    name="Statistics"
                    component={StatisticsPage}
                    options={{
                      title: "",
                      headerBackVisible: true,
                    }}
                  />
                  {/* //add stack screens here like: <Stack.Screen name="Name" component={ScreenName} /> */}
                </Stack.Navigator>
              </NavigationContainer>
            </GestureHandlerRootView>
          </ShoppingListContext.Provider>
        </InventoryContext.Provider>
      </UserContext.Provider>
    </>
  );
}
