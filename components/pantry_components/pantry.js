import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const pantryCard = (props) => {

  const recipeData = props.recipe;
  const imageSource = { uri: recipeData.image }; 

  const handleOnPress = () => {
    props.onPress(recipeData);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handleOnPress}>
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
    // fontWeight: 400,
    alignSelf: "center"
  },
});

export default PantryCard;
