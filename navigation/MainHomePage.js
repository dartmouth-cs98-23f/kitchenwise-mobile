import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Navbar from './Navbar';

const MainHomePage = ({ navigation }) => {
  return (
    // Use a fragment to wrap adjacent elements
    <>
      <View style={styles.mainHomeContainer}>
        <Text style={styles.mainHomeTitle}>Homepage</Text>
        <Text style={styles.mainHomeSubtitle}>Explore the Future of Cooking with Alexa</Text>
        <TouchableOpacity 
          style={styles.goBackButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  mainHomeContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60, // Add padding to avoid overlap with the Navbar
  },
  mainHomeTitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
  },
  mainHomeSubtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  goBackButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 100,
    width: '50%',
    alignItems: 'center',
  },
  goBackButtonText: {
    color: '#FFFFFF',
    fontWeight: '400',
  },
  // Ensure to close the styles object correctly
});


export default MainHomePage;
