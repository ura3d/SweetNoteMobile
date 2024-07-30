import React from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';


const ActiveNote = ({title, subtitle}) => {
    return(
        <View>
            <View style={activeNoteStyle.block}>
                <Text style={activeNoteStyle.title}>{title}</Text>
                <Text style={activeNoteStyle.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
};

const activeNoteStyle = StyleSheet.create({
    block: {
        justifyContent: 'center',
        height: 70,
        borderBottomWidth: 1,
        borderColor: '#a2a2a2',
        paddingLeft: 15,
        backgroundColor: 'white',
    },
    title: {
        color: 'black',
        fontSize: 25,
    },
    subtitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: '100',
    }
});

export default ActiveNote;