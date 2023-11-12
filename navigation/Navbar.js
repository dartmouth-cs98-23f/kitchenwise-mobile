import React from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

const Navbar = () => {
    const [opacity, setOpacity] = useState(new Animated.Value(1));

    const navigateWithAnimation = (routeName) => {
        // Fade out
        Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            navigation.navigate(routeName);
            // Fade in
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };
    const navigation = useNavigation();

    const navigateToProfile = () => {
        navigation.navigate('Profile');
    };

    const navigateToMainHomePage = () => {
        // Use the navigate function to go to the MainHomePage
        navigation.navigate('MainHomePage');
    };

    const navigateToPantryPage = () => {
        navigation.navigate('Pantry');
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Animated.View style={[styles.button, { opacity }]}>
                <TouchableOpacity style={styles.button} onPress={navigateToPantryPage}>
                    <Ionicons name="file-tray-stacked-outline" size={24} color="#957E51" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={navigateToMainHomePage}>
                    <Ionicons name="home-outline" size={24} color="#957E51" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={navigateToProfile}>
                    <Ionicons name="person-outline" size={24} color="#957E51" />
                </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff', // Match the navbar background
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#957E51',
    },
    button: {
        alignItems: 'center',
    },
});

export default Navbar;