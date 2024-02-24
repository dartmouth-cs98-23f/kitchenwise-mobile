import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import themeStyles from "../styles";

const Navbar = () => {
  const navigation = useNavigation();
  const [selectedPage, setSelectedPage] = useState(null);
  const route = useRoute();

  const navigateToProfile = () => {
    navigation.navigate("Profile");
    setSelectedPage("Profile");
  };

  const navigateToPantryPage = () => {
    navigation.navigate("Pantry");
    setSelectedPage("Pantry");
  };

  const navigateToShoppingList = () => {
    navigation.navigate("ShoppingList");
    setSelectedPage("ShoppingList");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Ionicons
            name="cart-outline"
            size={24}
            color={
              route.name === "ShoppingList"
                ? "black"
                : themeStyles.colors.uninteractableText
            }
            onPress={navigateToShoppingList}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToPantryPage}>
          <Ionicons
            name="file-tray-stacked-outline"
            size={24}
            color={
              route.name === "Pantry"
                ? "black"
                : themeStyles.colors.uninteractableText
            }
            stroke
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToProfile}>
          <Ionicons
            name="person-outline"
            size={24}
            color={
              route.name === "Profile"
                ? "black"
                : themeStyles.colors.uninteractableText
            }
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: themeStyles.colors.uninteractableBackground,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
  },
  button: {
    alignItems: "center",
  },
});

export default Navbar;
