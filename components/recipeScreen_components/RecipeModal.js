import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RecipeModal = (props) => {
  return (
    <Modal visible={props.modalState} animationType="slide" transparent={false}>
      <View style={styles.recipeModalContainer}>
        <View>
          <Image style={styles.image} source={{ uri: props.recipe.image }} />
        </View>
        <TouchableOpacity onPress={props.backFunction}>
          <Ionicons
            name="arrow-back-outline"
            size={36}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.modalSubheader}>You have</Text>
        </View>
        <FlatList></FlatList>
        <Text style={styles.modalSubheader}>You need</Text>
        <FlatList></FlatList>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  recipeModalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60, // Add padding to avoid overlap with the Navbar
  },
  image: {
    width: "80",
    height: "30%",
    margin: 5,
  },
  modalSubheader: {
    color: "#353434d9",
    fontSize: 20,
    fontWeight: "600",
    margin: "5%",
  },
  backButton: {
    margin: "5%",
    marginTop: "10%",
  },
});

export default RecipeModal;
