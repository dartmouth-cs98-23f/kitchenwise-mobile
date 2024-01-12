// AlexaButton.js
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AlexaButton = () => {
  const navigation = useNavigation();

  const handleAlexaButtonClick = () => {
    // Navigate to the 'AlexaPage'
    navigation.navigate('Alexa');
  };

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleAlexaButtonClick}>
      <Text style={styles.buttonText}>Alexa</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      bottom: 35,
      right: 16,
      backgroundColor: 'rgba(0, 168, 225, 0.9)', // Transparent Amazon blue color
      borderRadius: 35, 
      padding: 10,
      width: 70, 
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });

export default AlexaButton;
