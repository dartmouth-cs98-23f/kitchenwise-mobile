import React, { useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

import Navbar from "./Navbar";
import Button from "../components/form_components/Button";
import themeStyles from "../styles";
import InventoryContext from "../context/inventory-context";
import InventoryPill from "../components/profile_components/InventoryPill";
import AddInventoryPill from "../components/profile_components/AddInventoryPill";
import CreateModal from "../components/profile_components/CreateModal";
import {
  createInventory,
  deleteInventory,
  getUserInventories,
  renameInventory,
} from "../api/inventory-api";
import UserContext from "../context/user-context";
import DeleteModal from "../components/profile_components/DeleteModal";
import IntegrationPill from "../components/profile_components/IntegrationPill";

const ProfilePage = () => {
  const { userInventories, setUserInventories } = useContext(InventoryContext);
  const { userId } = useContext(UserContext);
  const navigation = useNavigation();
  const [editingInventories, setEditingInventories] = useState(false);
  const [creatingInventory, setCreatingInventory] = useState(false);
  // ID of the inventory currently being deleted, null if none are
  const [inventoryDeleting, setInventoryDeleting] = useState(null);
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
    [userId, refreshInventories, setCreatingInventory]
  );
  const onRename = useCallback(
    (invId, newTitle) => {
      renameInventory(userId, invId, newTitle).then((data) => {
        refreshInventories();
      });
    },
    [userId, refreshInventories]
  );
  const onStartDelete = useCallback(
    (inventory) => {
      setInventoryDeleting(inventory);
    },
    [setInventoryDeleting]
  );
  const onConfirmDelete = useCallback(
    (destinationInventoryId) => {
      deleteInventory(userId, inventoryDeleting._id, destinationInventoryId)
        .then(() => {
          refreshInventories().then(() => {
            setInventoryDeleting(null);
          });
        })
        .catch(() => {
          showMessage({
            message: "Error",
            description: "Unable to remove inventory",
            type: "danger",
          });
          setInventoryDeleting(null);
        });
    },
    [userId, inventoryDeleting, refreshInventories, setInventoryDeleting]
  );

  const navigateToStatisticsPage = useCallback(() => {
    navigation.navigate("Statistics");
  }, [navigation]);

  return (
    <>
      <SafeAreaView style={themeStyles.components.screenContainer}>
        <View style={styles.pageHeader}>
          <Text style={themeStyles.text.h1}>Your Profile</Text>
        </View>
        <View style={styles.sectionContainer}>
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
          {userInventories ? (
            editingInventories ? (
              <>
                {/* TODO: dragging doesn't work */}
                <DraggableFlatList
                  data={userInventories}
                  renderItem={({ item }) => (
                    <InventoryPill
                      name={item.title}
                      editing
                      onChange={(newText) => onRename(item._id, newText)}
                      onDelete={() => onStartDelete(item)}
                      deleteable={userInventories.length > 1}
                    />
                  )}
                  keyExtractor={(inv) => inv._id}
                  contentContainerStyle={styles.pillsContainerEditing}
                  style={{ overflow: "visible" }}
                  scrollEnabled={false}
                />
                {editingInventories && (
                  <AddInventoryPill
                    onPress={() => setCreatingInventory(true)}
                  />
                )}
              </>
            ) : (
              <View
                style={[styles.pillsContainer, styles.pillsContainerStatic]}
              >
                {userInventories.map((inv, i) => (
                  <InventoryPill name={inv.title} key={i} />
                ))}
              </View>
            )
          ) : null}
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={themeStyles.text.h2}>Your Integrations</Text>
          </View>
          <View>
            <IntegrationPill source={require("../assets/instacart_logo.png")} />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={themeStyles.text.h2}>Your Statistics</Text>
          </View>
          <Button
            text="See Your Statistics"
            onPress={navigateToStatisticsPage}
            containerStyle={{
              width: "50%",
              backgroundColor: themeStyles.colors.interactableBackground,
              borderRadius: 2,
            }}
          />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={themeStyles.text.h2}>Settings</Text>
          </View>
          <Button
            text="Log Out"
            color={themeStyles.colors.authBlack}
            textColor="white"
            containerStyle={styles.logOutButton}
            onPress={() => navigation.navigate("Home")}
          />
        </View>

        {/* <ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={navigateToStatisticsPage}
          >
            <Text style={styles.buttonText}>Inventory Statistics</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Connect to Instacart</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Help</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
        </ScrollView> */}
      </SafeAreaView>
      <Navbar />
      {userInventories && (
        <>
          <CreateModal
            visible={creatingInventory}
            onSubmit={onSubmit}
            onClose={() => setCreatingInventory(false)}
          />
          <DeleteModal
            visible={inventoryDeleting != null}
            inventoryTitle={inventoryDeleting?.title}
            inventories={userInventories}
            onSubmit={onConfirmDelete}
            onClose={() => setInventoryDeleting(null)}
          />
        </>
      )}
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
  sectionContainer: {
    paddingVertical: 12,
  },
  logOutButton: {
    borderRadius: 8,
  },
});

export default ProfilePage;
