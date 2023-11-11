import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
// import PantryCard from "../components/pantry_components/pantry";
import Navbar from "./Navbar";
import { Ionicons } from "@expo/vector-icons";


  const PantryPage =  ( {navigation} ) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
            <text>Test text</text>
            <Navbar navigation={navigation}/>
            </View>
        </SafeAreaView>
    );
};


  export default PantryPage;