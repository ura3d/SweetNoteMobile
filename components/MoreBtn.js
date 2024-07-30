import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const MoreBtn = ({ moreBtnActive, setActiveTheme, activeTheme }) => {
    const [slideAnim] = useState(new Animated.Value(100));

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: moreBtnActive ? -80 : 200,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [moreBtnActive]);

    return (
        <Animated.View style={[styles.MoreBtnBlock, { transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity style={styles.top}><Text>Login with Google</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middle}><Text>Settings</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middle}><Text>Make PDF</Text></TouchableOpacity>
            <TouchableOpacity style={styles.bottom} onPress={() => setActiveTheme(activeTheme === 0 ? 1 : 0)}><Text>Theme change</Text></TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    MoreBtnBlock: {
        borderRadius: 7,
        width: 170,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    top: {
        backgroundColor: 'rgb(233, 233, 237)',
        height: 40,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middle: {
        backgroundColor: 'rgb(233, 233, 237)',
        height: 40,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        backgroundColor: 'rgb(233, 233, 237)',
        height: 40,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default MoreBtn;
