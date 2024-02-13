import { TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import themeStyles from "../../styles.js";

const SearchBar = ({ onChange }) => {
  return (
    <TouchableOpacity style={styles.searchContainer}>
      <Ionicons name="search" color={themeStyles.colors.interactableText} />
      <TextInput
        placeholderTextColor={themeStyles.colors.interactableText}
        placeholder="Search"
        onChangeText={onChange}
      ></TextInput>
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
});

export default SearchBar;
