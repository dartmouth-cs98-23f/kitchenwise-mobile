import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const editOnPress = () => {

}

const PantryItem = ({ name, expiration, image, quantity, unit }) => (
  <View style={styles.pantryItemContainer}>
    <Image style={styles.itemImage}></Image>
    <View style={styles.itemInfoContainer}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemInfoText}>
        {quantity} {unit} {expiration ? "exp." + expiration : null }
      </Text>
    </View>
    <TouchableOpacity style={styles.editButton} onPress={editOnPress}>
      <Ionicons name="create-outline" size={20} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  pantryItemContainer: {
    borderRadius: 10,
    alignItems: "center",
    alignSelf: 'center',
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 4,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 8,
    backgroundColor: 'white',
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    maxWidth: "98%"
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemInfoText: {
    color: "#666"
  },
  itemImage: {
    flex: 1,
    backgroundColor: "#ccc",
    height: 60,
    width: 25,
    marginVertical: 2,
    marginRight: 20,
  },
  itemInfoContainer: {
    flex: 3
  },
  editButton: {
    justifyContent: 'center',
    alignItems: "center",
    flex: 1,
  },
  editIcon: {
  
  }
});


export default PantryItem;