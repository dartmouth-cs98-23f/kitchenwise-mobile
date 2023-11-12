import { useEffect, useState } from "react";
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
import { getUserInventories } from "./api/inventory-api";

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
  return (

    <>
      <UserContext.Provider value={{ userId, setUserId }}>
        <InventoryContext.Provider
          value={{ userInventories, setUserInventories }}
        >
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={LoginScreen}
                options={{ title: "Welcome", headerShown: true }}
              />
              <Stack.Screen
                name="MainHomePage"
                component={MainHomePage}
                options={{ title: "Main Home Page", headerBackVisible: false, headerTitle: "", animation: 'none' }}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerBackVisible: false, animation: 'none' }}/>

              <Stack.Screen name="Pantry" component={PantryPage} options={{ headerBackVisible: false, animation: 'none' }}/>
              {/* //add stack screens here like: <Stack.Screen name="Name" component={ScreenName} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </InventoryContext.Provider>
      </UserContext.Provider>
    </>
  );
}
