import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Drawer, Provider as PaperProvider, Text, TextInput, Button } from 'react-native-paper';
import Note from './Note.js';
import ActiveNote from './ActiveNote.js';
import { Swipeable } from 'react-native-gesture-handler';

//IMG
import searchIco from '../assets/search1.png';
import shitIco from '../assets/shit.png';

const NotesBlock = ({ toggleDrawer, isDrawerOpen, isEditing, toogleEditing, notes, activeNote, handleActiveNote, addNote, deleteNote }) => {

    const [sideMenuAnim] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(sideMenuAnim, {
            toValue: isDrawerOpen ? 0 : -330,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            if (isDrawerOpen && !isEditing) {
                toogleEditing();
                setSearchValue('');
            } else if (!isDrawerOpen && isEditing) {
                toogleEditing();
                setSearchValue('');
            }
        });
    }, [isDrawerOpen]);

    const extractTitleFromBody = (body) => {
        // Регулярное выражение для поиска первого HTML-блока
        const firstBlockPattern = /<(\w+)[^>]*>(.*?)<\/\1>/;
        const match = body.match(firstBlockPattern);
        
        if (match) {
          const [fullMatch, tag, content] = match; // работа со стандартными функциями JS?????
          if (tag.toLowerCase() === 'h1') {
            return content;
          }
        }
        
        return '';
    };

    const extractSubtitleFromBody = (body) => {
        // Регулярное выражение для поиска всех HTML-блоков
        const blockPattern = /<(\w+)[^>]*>(.*?)<\/\1>/g; 
        const matches = [...body.matchAll(blockPattern)]; // Найти все совпадения
      
        // Проверка первого блока
        if (matches.length > 0) {
          const [fullMatch1, tag1, content1] = matches[0];
          
          // Если первый блок не <h1>, вернуть его содержимое
          if (tag1.toLowerCase() !== 'h1') {
            return content1.length > 25 ? content1.substring(0, 25) + '...' : content1;
          }
          
          // Если первый блок <h1>, проверить второй блок
          if (matches.length > 1) {
            const [fullMatch2, tag2, content2] = matches[1];
            if (tag2.toLowerCase() === 'div') {
              return content2.length > 25 ? content2.substring(0, 25) + '...' : content2;
            }
          }
        }
      
        // Если ни один из условий не выполнен, вернуть пустую строку
        return '';
    };

    const leftSwipe = (id) => {
        return(
            <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteNote(id)}>
                <Image source={shitIco} style={styles.deleteImg}/>
            </TouchableOpacity>
        )
    };

    const [filterNotes, setFilterNotes] = useState(notes);
    const [searchValue, setSearchValue] = useState('');
    const searchNote = (text) => {
        setSearchValue(text);
        //console.log(text);
    }
    useEffect(() => {
        if(searchValue.length > 1){
            const filteredNotes = notes.filter(note =>
            note.body.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilterNotes(filteredNotes);
        }
        else{
            setFilterNotes(notes);
        }
    }, [searchValue, notes]);

    return(
        <PaperProvider>
            <TouchableOpacity style={{backgroundColor: 'rgba(0, 0, 0, 1)', height: 1000, width: 1000, position: 'absolute', opacity: isDrawerOpen ? 0.4 : 0}} onPress={toggleDrawer} ></TouchableOpacity>

            <Animated.View style={[styles.block, {transform: [{ translateX: sideMenuAnim }]}]}>
                <View style={styles.logo}>
                    <Text style={styles.text}>SweetNote</Text>
                </View>

                <View style={styles.main}>

                    <View style={styles.search}>
                        <Image style={styles.img} source={searchIco} />
                        <TextInput placeholder='Search' style={styles.input} value={searchValue} onChangeText={text => searchNote(text)}/>
                    </View>

                    <TouchableOpacity style={styles.add} onPress={addNote}>
                        <Image style={styles.plus} source={require('../assets/plus.png')} />
                    </TouchableOpacity>

                    <ScrollView>
                        {filterNotes.map((note) => (
                            <Swipeable renderRightActions={()=>leftSwipe(note.id)} key={note.id}>
                                {note.id === activeNote ? <Swipeable renderRightActions={()=>leftSwipe(note.id)} key={note.id}><ActiveNote title={extractTitleFromBody(note.body)} subtitle={extractSubtitleFromBody(note.body) === '<br>' ? '' : extractSubtitleFromBody(note.body)} /></Swipeable> : <TouchableOpacity onPress={() => handleActiveNote(note.id)}><Note title={extractTitleFromBody(note.body)} subtitle={extractSubtitleFromBody(note.body) === '<br>' ? '' : extractSubtitleFromBody(note.body)}/></TouchableOpacity>}
                            </Swipeable>
                        ))}
                        <View style={{height: 300}}></View>
                    </ScrollView>

                </View>

            </Animated.View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    block: {
        width: 300,
        zIndex: 1,
    },
    logo: {
        backgroundColor: 'rgb(0, 108, 168)',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 30,
    },
    main: {
        backgroundColor: '#232323',
        height: '100%',
    },
    search: {
        borderRadius: 15,
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginBottom: 5,
        marginVertical: 30,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderRadius: 15,
        height: 50,
        width: 215,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    img: {
        height: 23,
        width: 23,
        marginLeft: 15,
        marginRight: 5,
    },
    add: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#a2a2a2',
    },
    plus: {
        height: 40,
        width: 40,
        opacity: 0.2,
    },
    deleteBtn: {
        height: 70,
        width: 70, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'red',
    },
    deleteImg: {
        height: 35,
        width: 35,
    }
});

export default NotesBlock;
