import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const RecipeCard = (props) => {

  const recipeData = props.recipe;
  const imageSource = { uri: recipeData.image }; 

  const handleOnPress = () => {
    props.onPress(recipeData);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handleOnPress}>
        <View>
        <Image source={imageSource} style={styles.cardImage} />
        </View>

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
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#DFBC8D",
  },
  cardImage: {
    flex: 1,
  },
  cardLabelContainer: {
    backgroundColor: "#E2E5EE",
  },
  cardLabel: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 400,
    alignSelf: "center"
  },
});

export default RecipeCard;
