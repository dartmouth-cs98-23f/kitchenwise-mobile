import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Navbar from "./Navbar";
import themeStyles from "../styles";
import InventoryContext from "../context/inventory-context";
import InventoryPill from "../components/profile_components/InventoryPill";
import AddInventoryPill from "../components/profile_components/AddInventoryPill";

const ProfilePage = () => {
  const { userInventories } = useContext(InventoryContext);
  return (
    <>
      <SafeAreaView style={themeStyles.components.screenContainer}>
        <View>
          <Text style={themeStyles.text.h1}>Your Profile</Text>
        </View>
        <View>
          <Text style={themeStyles.text.h2}>Your Inventories</Text>
          <View style={styles.pillsContainer}>
            {userInventories.map((inv) => (
              <InventoryPill name={inv.title} />
            ))}
            <AddInventoryPill />
          </View>
        </View>
        <View>
          <Text style={themeStyles.text.h2}>Your Integrations</Text>
        </View>
        <View>
          <Text style={themeStyles.text.h2}>Settings</Text>
        </View>
      </SafeAreaView>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  pillsContainer: {
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
});

export default ProfilePage;
