import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import themeStyles from "../../styles";

const ShoppingListItem = ({ item, name, amount, selectItems, tags }) => {
  const [isSelected, setIsSelected] = useState(false);

  const itemPressed = () => {
    selectItems(item);
    let toggle = isSelected ? false : true;
    setIsSelected(toggle);
  };

  return (
    <View style={styles.listItemContainer}>
      <Text
        style={[
          styles.listItemText,
          { flexGrow: 1 },
          isSelected && styles.selectedText,
        ]}
      >
        {name}
      </Text>
      <Text style={[styles.listItemText, isSelected && styles.selectedText]}>
        {amount || "1"}
      </Text>
      <TouchableOpacity onPress={itemPressed}>
        <Ionicons
          name={isSelected ? "checkmark-circle-outline" : "ellipse-outline"}
          size={24}
          color={isSelected ? themeStyles.colors.selectedText : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    marginTop: 3,
    alignItems: "center",
  },
  listItemText: {
    fontSize: 16,
    fontFamily: "Lato",
  },
  listItemRight: {
    fontFamily: "Lato",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  selectedText: {
    color: themeStyles.colors.selectedText,
  },
});
export default ShoppingListItem;
