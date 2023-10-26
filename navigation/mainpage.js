import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MainHomePage = ({ navigation }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  
  mainHomeContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
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
});

