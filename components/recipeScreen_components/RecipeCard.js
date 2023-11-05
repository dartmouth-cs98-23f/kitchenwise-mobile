import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RecipeCard = (recipe) => {
  return (
    <View style={styles.card}>
      <Image source={recipe.image} style={styles.cardImage} />
      <Text style={styles.cardLabel}>{recipe.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: "green",
    margin: "5%"
  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  cardLabel: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default RecipeCard;
