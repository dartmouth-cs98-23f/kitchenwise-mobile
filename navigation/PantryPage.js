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
import Navbar from "./Navbar";


  const PantryPage =  () => {
    return (
      <>
        <View style={styles.container}>
          <Text>Test text</Text>
        </View>
        <Navbar/>
      </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});



  export default PantryPage;