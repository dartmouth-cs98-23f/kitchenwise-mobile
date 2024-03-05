import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = getAuth();

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        alert('Password reset email sent to ' + email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors
        if (errorCode === 'auth/invalid-email') {
          alert('No user with this email found.');
        } else {
          console.error('Error sending password reset email', error);
        }
      });
  };

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

      </View>
      <TouchableOpacity style={styles.buttonBlack} onPress={handleForgotPassword}>
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

export default ForgotPassword;
