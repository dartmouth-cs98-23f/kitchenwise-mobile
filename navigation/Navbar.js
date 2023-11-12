import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <Animated.View style={[styles.container, { opacity }]}>
                <TouchableOpacity style={styles.button} onPress={() => navigateWithAnimation('Pantry')}>
                    <Ionicons name="file-tray-stacked-outline" size={24} color="#957E51" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigateWithAnimation('MainHomePage')}>
                    <Ionicons name="home-outline" size={24} color="#957E51" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigateWithAnimation('Profile')}>
                    <Ionicons name="person-outline" size={24} color="#957E51" />
                </TouchableOpacity>
            </Animated.View>
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
