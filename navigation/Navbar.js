import React from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  const navigateToMainHomePage = () => {
    // Use the navigate function to go to the MainHomePage
    navigation.navigate("MainHomePage");
  };

  const navigateToPantryPage = () => {
    navigation.navigate("Pantry");
  };

  const navigateToShoppingList = () => {
    navigation.navigate("ShoppingList");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Ionicons
            name="cart-outline"
            size={24}
            color="#957E51"
            onPress={navigateToShoppingList}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToPantryPage}>
          <Ionicons
            name="file-tray-stacked-outline"
            size={24}
            color="#957E51"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToProfile}>
          <Ionicons name="person-outline" size={24} color="#957E51" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff", // Match the navbar background
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#957E51",
  },
  button: {
    alignItems: "center",
  },
});

export default Navbar;
