import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";

import Navbar from "./Navbar";
import Button from "../components/form_components/Button";
import themeStyles from "../styles";
import InventoryContext from "../context/inventory-context";
import InventoryPill from "../components/profile_components/InventoryPill";
import AddInventoryPill from "../components/profile_components/AddInventoryPill";

const ProfilePage = () => {
  const { userInventories } = useContext(InventoryContext);
  const [editingInventories, setEditingInventories] = useState(false);
  return (
    <>
      <SafeAreaView style={themeStyles.components.screenContainer}>
        <View style={styles.pageHeader}>
          <Text style={themeStyles.text.h1}>Your Profile</Text>
        </View>
        <View>
          <View style={styles.sectionHeaderRow}>
            <Text style={themeStyles.text.h2}>Your Inventories</Text>
            {editingInventories ? (
              <Button
                text="Done Editing"
                onPress={() => setEditingInventories(false)}
                containerStyle={{
                  padding: 0,
                  height: 28,
                }}
              />
            ) : (
              <Ionicons
                name="create-outline"
                size={20}
                onPress={() => setEditingInventories(true)}
              />
            )}
          </View>
          {editingInventories ? (
            <>
              {/* TODO: dragging doesn't work */}
              <DraggableFlatList
                data={userInventories}
                renderItem={(inv) => (
                  <InventoryPill name={inv.item.title} editing />
                )}
                keyExtractor={(inv) => inv._id}
                contentContainerStyle={styles.pillsContainerEditing}
                style={{ overflow: "visible" }}
                scrollEnabled={false}
                onDragBegin={() => {
                  console.log("E");
                }}
              />
              {editingInventories && <AddInventoryPill />}
            </>
          ) : (
            <View style={[styles.pillsContainer, styles.pillsContainerStatic]}>
              {userInventories.map((inv, i) => (
                <InventoryPill name={inv.title} key={i} />
              ))}
            </View>
          )}
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
  pageHeader: {
    marginBottom: 8,
  },
  pillsContainer: {
    display: "flex",
  },
  pillsContainerStatic: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 12,
  },
  pillsContainerEditing: {
    flexDirection: "column",
    gap: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    width: "100%",
    flexGrow: 1,
  },
  sectionHeaderRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});

export default ProfilePage;
