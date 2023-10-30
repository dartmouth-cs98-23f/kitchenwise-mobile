import React from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Navbar = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name="add-circle-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name="home-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name="person-outline" size={24} color="black" />
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
        borderTopColor: '#ccc',
    },
    button: {
        alignItems: 'center',
    },
});

export default Navbar;
