import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const RecipeCard = (props) => {
  const recipeData = props.recipe;
  const imageSource = { uri: recipeData.image };

  const handleOnPress = () => {
    props.onPress(recipeData);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handleOnPress} style={{ width: "100%" }}>
        <Image source={imageSource} style={styles.cardImage} />
        <View style={styles.cardLabelContainer}>
          <Text style={styles.cardLabel}>{recipeData.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    margin: "5%",
    borderColor: "#DFBC8D",
    width: "40%",
    borderRadius: 20,
  },
  cardImage: {
    width: "100%",
    aspectRatio: 1 / 1,
    borderRadius: 20,
  },
  cardLabelContainer: {
    width: "100%",
  },
  cardLabel: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "400",
    alignSelf: "center",
  },
});

export default RecipeCard;
