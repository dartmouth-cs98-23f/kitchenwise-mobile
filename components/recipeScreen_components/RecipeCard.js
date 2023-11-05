import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RecipeCard = ({recipe}) => {
  const imageSource = { uri: recipe.image }; 
  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.cardImage} />
      <View style={styles.cardLabelContainer}>
       <Text style={styles.cardLabel}>{recipe.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    margin: "5%",
    borderWidth: 1,
    borderColor: "#DFBC8D",
  },
  cardImage: {
    width: 150,
    height: 150,
  },
  cardLabelContainer: {
    backgroundColor: "#E2E5EE",
    width: 150,
  },
  cardLabel: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 400,
    alignSelf: "center"
  },
});

export default RecipeCard;
