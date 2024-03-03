import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const CreateAccount = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConfirmPress = () => {
    // TODO: Implement the create account logic
    navigation.navigate('Pantry');
  };
  const handleBack = () => {
    navigation.navigate('Home')

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>kitchenwise.</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.buttonBlack} onPress={handleConfirmPress}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonWhite} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTextWhite}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#64D2D9',
        marginBottom: '45%',
      },
      inputContainer: {
        width: '90%',
        marginBottom: '45%',
      },
      input: {
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 50,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
      },
      buttonBlack: {
        backgroundColor: '#000',
        paddingVertical: 12,
        width: '90%',
        borderRadius: 20,
        marginBottom: 16,
        
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20,
      },
      buttonTextWhite: {
        color: '#000',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20,
      },
      buttonWhite: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        paddingVertical: 12,
        width: '90%',
        borderRadius: 20,
        marginBottom: 16,
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 3,
      },
      buttonTextBlack: {
        color: '#000',
        textAlign: 'center',
        fontWeight: '600',
      },
});

export default CreateAccount;
