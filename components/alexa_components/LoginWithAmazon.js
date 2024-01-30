// LoginWithAmazonButton.js
import React from 'react';
import { TouchableOpacity, Image, View, SafeAreaView } from 'react-native';
// @ts-ignore
import LoginWithAmazon from 'react-native-login-with-amazon';

const LoginWithAmazonButton = () => {
  const handleLoginWithAmazon = () => {
    // Handle the Login with Amazon action
    console.log('Login with Amazon clicked');
    LoginWithAmazon.login();
    // You can implement additional logic here if needed
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleLoginWithAmazon} id="LoginWithAmazon">
        <Image
          style={{ width: 156, height: 32 }}
          source={{
            uri: 'https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png',
          }}
          alt="Login with Amazon"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginWithAmazonButton;