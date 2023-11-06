import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/login_components/LoginScreen";
import MainHomePage from "./navigation/MainHomePage";
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
                options={{ title: "Main Home Page", headerShown: false }}
              />
              {/* //add stack screens here like: <Stack.Screen name="Name" component={ScreenName} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </InventoryContext.Provider>
      </UserContext.Provider>
    </>
  );
}
