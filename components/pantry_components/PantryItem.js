import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const PantryItem = ({ name, expiration, image, quantity, unit }) => {
  const [editItem, setEditItem] = useState(false);
  const [inputQntText, setInputQntText] = useState("");
  const [inputExpText, setExpInputText] = useState("");

  const editOnPress = () => {
    setEditItem(true);
    console.log(editItem);
  };

  const onEditDonePress = () => {
    setEditItem(false);
  };

  const handleQntInputChange = (text) => {
    setInputQntText(text);
  };
  const handleExpInputChange = (text) => {
    setInputExpText(text);
  };

  return (
    <View style={styles.pantryItemContainer}>
      <Text style={styles.itemName}>{toTitleCase(name)}</Text>
      {expiration ? (
        <Text style={[styles.itemInfoText]}>
          {expiration ? "exp." + expiration : null}
        </Text>
      ) : null}
      <Text style={[styles.itemInfoText]}>
        {quantity} {unit}
      </Text>

      {/* <TouchableOpacity style={styles.editButton} onPress={editOnPress}>
        <Ionicons name="create-outline" size={20} />
      </TouchableOpacity> */}

      {/* {editItem && (
        <Modal>
          <SafeAreaView style={styles.editScreen}>
            <Text style={styles.editIteamHeader}>{toTitleCase(name)}</Text>
            <Image style={styles.editImg}></Image>
            <View style={styles.editInfoContainer}>
              <Text style={styles.editItemSubheader}>Quantity</Text>
              <TextInput
                placeholder={quantity.toString()}
                onChangeText={handleQntInputChange}
                value={inputQntText}
                keyboardType="numeric"
              />
              <Text style={styles.editItemSubheader}>Expiration Date</Text>
              <TextInput
                placeholder={
                  expiration ? "exp." + expiration.toString() : "None"
                }
                onChangeText={handleExpInputChange}
                value={inputExpText}
              />
            </View>
            <TouchableOpacity style={styles.editDone} onPress={onEditDonePress}>
              <Text style={styles.doneText}>DONE</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  pantryItemContainer: {
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: 8,
    marginVertical: 4,
    paddingHorizontal: 12,
    elevation: 4,
    backgroundColor: "#FAFAFA",
    // overflow: Platform.OS === "android" ? "hidden" : "visible",
    width: "100%",
  },
  itemName: {
    fontSize: 16,
    color: "#333",
    flexGrow: 1,
    paddingRight: 16,
    maxWidth: "80%",
  },
  itemInfoText: {
    color: "#333",
    width: "20%",
    textAlign: "right",
  },
  itemInfoContainer: {
    flex: 3,
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  editScreen: {
    height: "100%",
  },
  editImg: {
    backgroundColor: "blue",
    height: "40%",
    width: "100%",
    marginVertical: "10%",
  },
  editIteamHeader: {
    fontSize: "40%",
    marginLeft: "5%",
    marginTop: "5%",
  },
  editItemSubheader: {
    fontSize: "25%",
    marginTop: "10%",
  },
  editInfoContainer: {
    marginLeft: "5%",
  },
  editDone: {
    alignItems: "center",
    backgroundColor: "black",
    marginHorizontal: "40%",
    marginVertical: "10%",
    padding: "2%",
    borderRadius: "5%",
  },
  doneText: {
    color: "white",
  },
});

export default PantryItem;
