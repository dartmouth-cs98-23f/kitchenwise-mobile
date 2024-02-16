import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Navbar from "./Navbar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
  const navigation = useNavigation();

  const navigateToStatisticsPage = () => {
    navigation.navigate('InventoryStatistics');
}
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/profile_photo.png')} style={styles.profileImage} />
          <Text style={styles.nameText}>John Doe</Text>
          <Text style={styles.emailText}>john.doe@example.com</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {/* Your touchable opacity buttons go here */}
          <TouchableOpacity style={styles.button} onPress={navigateToStatisticsPage}>
            <Text style={styles.buttonText}>Inventory Statistics</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add to Alexa</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Connect to Instacart</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Help</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
            <View style={styles.separator} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 16,
    color: '#888',
  },
  scrollView: {
    flex: 1,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default ProfilePage;
