import React from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';


const Note = ({title, subtitle}) => {
    return(
        <View>
            <View style={noteStyle.block}>
                <Text style={noteStyle.title}>{title}</Text>
                <Text style={noteStyle.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
};

const noteStyle = StyleSheet.create({
    block: {
        justifyContent: 'center',
        height: 70,
        borderBottomWidth: 1,
        borderColor: '#a2a2a2',
        paddingLeft: 15,
        backgroundColor: '#232323',
    },
    title: {
        color: 'white',
        fontSize: 25,
    },
    subtitle: {
        color: 'grey',
        fontSize: 15,
        fontWeight: '100',
    }
});

export default Note;