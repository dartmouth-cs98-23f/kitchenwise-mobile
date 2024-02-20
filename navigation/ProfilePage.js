import React, { useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { showMessage, hideMessage } from "react-native-flash-message";

import Navbar from "./Navbar";
import Button from "../components/form_components/Button";
import themeStyles from "../styles";
import InventoryContext from "../context/inventory-context";
import InventoryPill from "../components/profile_components/InventoryPill";
import AddInventoryPill from "../components/profile_components/AddInventoryPill";
import CreateModal from "../components/profile_components/CreateModal";
import {
  createInventory,
  getUserInventories,
  renameInventory,
} from "../api/inventory-api";
import UserContext from "../context/user-context";

const ProfilePage = () => {
  const { userInventories, setUserInventories } = useContext(InventoryContext);
  const { userId } = useContext(UserContext);
  const [editingInventories, setEditingInventories] = useState(false);
  const [creatingInventory, setCreatingInventory] = useState(false);
  const refreshInventories = useCallback(async () => {
    getUserInventories(userId)
      .then((inventories) => {
        if (inventories) {
          setUserInventories(inventories);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [getUserInventories, setUserInventories]);
  const onSubmit = useCallback(
    (inventoryTitle) => {
      createInventory(userId, inventoryTitle)
        .then(() => {
          refreshInventories().then(() => {
            setCreatingInventory(false);
          });
        })
        .catch((err) => {
          showMessage({
            message: "Error",
            description: err.response.data.message,
            type: "danger",
          });
          setCreatingInventory(false);
        });
    },
    [refreshInventories, setCreatingInventory]
  );
  const onRename = useCallback(
    (invId, newTitle) => {
      renameInventory(userId, invId, newTitle).then((data) => {
        refreshInventories();
      });
    },
    [refreshInventories]
  );
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
                data={userInventories.sort(
                  (a, b) => a._id.toString() > b._id.toString()
                )}
                renderItem={({ item }) => (
                  <InventoryPill
                    name={item.title}
                    editing
                    onChange={(newText) => onRename(item._id, newText)}
                  />
                )}
                keyExtractor={(inv) => inv._id}
                contentContainerStyle={styles.pillsContainerEditing}
                style={{ overflow: "visible" }}
                scrollEnabled={false}
              />
              {editingInventories && (
                <AddInventoryPill onPress={() => setCreatingInventory(true)} />
              )}
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
      <CreateModal
        visible={creatingInventory}
        onSubmit={onSubmit}
        onClose={() => setCreatingInventory(false)}
      />
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
