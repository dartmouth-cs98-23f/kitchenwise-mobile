import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import themeStyles from "../../styles.js";

const SearchBar = () => {
  return (
    <TouchableOpacity style={styles.searchContainer}>
      <Ionicons name="search" color={themeStyles.colors.interactableText} />
      <Text style={styles.searchPlaceholder}>Search</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: themeStyles.colors.interactableBackground,
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchPlaceholder: {
    color: themeStyles.colors.interactableText,
  },
});

export default SearchBar;
