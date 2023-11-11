import React from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainHomePage from "./navigation/MainHomePage";
import ProfilePage from "./navigation/ProfilePage";
import PantryPage from "./navigation/ProfilePage";

const Navbar = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PantryPage')}>
                    <Ionicons name="file-tray-stacked-outline" size={24} color="#957E51" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainHomePage')}>
                    <Ionicons name="home-outline" size={24} color="#957E51" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfilePage')}>
                    <Ionicons name="person-outline" size={24} color="#957E51" />
                </TouchableOpacity>
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