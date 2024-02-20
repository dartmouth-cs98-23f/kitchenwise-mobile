import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "../form_components/Input";
import themeStyles from "../../styles";

const InventoryPill = ({ name, editing }) => {
  return (
    <View
      style={[
        styles.pillContainer,
        editing ? styles.pillContainerEditing : styles.pillContainerStatic,
      ]}
    >
      {editing ? (
        <Input
          value={name}
          style={{ height: 36, borderWidth: 0, flexGrow: 1 }}
        />
      ) : (
        <Text style={styles.titleText}>{name}</Text>
      )}
      {editing && (
        <View style={styles.deleteBubble}>
          <Ionicons name="close-outline" color="white" size={18} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    height: 40,
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 4,
    flexDirection: "row",
  },
  pillContainerEditing: {
    backgroundColor: themeStyles.colors.interactableBackground,
    width: "100%",
    borderRadius: 4,
  },
  pillContainerStatic: {
    width: 80,
    justifyContent: "center",
    backgroundColor: themeStyles.colors.uninteractableBackground,
  },
  titleText: {
    fontSize: 12,
    textAlign: "center",
  },
  deleteBubble: {
    backgroundColor: themeStyles.colors.failure,
    height: 20,
    width: 20,
    borderRadius: 10,
    position: "absolute",
    top: -6,
    right: -6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InventoryPill;
