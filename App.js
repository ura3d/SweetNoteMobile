import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import MyEditor from './components/MyEditor';
import NotesBlock from './components/NotesBlock';
import downTexts from './components/DownText.js';
import themes from './components/Themes.js';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Состояние для управления видимостью меню
  const [isEditing, setIsEditing] = useState(true);
  const [footerText, handleFooterText] = useState('Sweet Note')


  const [activeTheme, setActiveTheme] = useState(0);

  const changeFooterText = (Text) => {
    if(!isEditing){
      return 0;
    }

    const defaultText = 'Sweet Note';
    const count = downTexts.length - 1;
    const random = Math.floor(Math.random() * 9); /// from 0 to 8

    if(typeof Text === 'string'){
      handleFooterText(Text);
    }
    else if(random === 8){
      handleFooterText(downTexts[Math.floor(Math.random() * count)]);
      console.log('Special');
    }
    else{
      handleFooterText(defaultText);
      console.log('Default');
    }
  }

  function toogleEditing(){
    setIsEditing(!isEditing);
    //console.log('isEditing: ' + isEditing + ' isDrawerOpen: ' + isDrawerOpen)
  }

  function toggleDrawer(text){
      setIsDrawerOpen(!isDrawerOpen); // Изменяем состояние при нажатии на кнопку или другое действие
      changeFooterText(text);
  };


  const [notes, setNotes] = useState([
      {
          id: 1000000,
          title: "My first React note",
          subtitle: "test body note 1",
          body: "<h1>My first React note</h1><div>test body note 1</div>"
      },
      {
          id: 1000001,
          title: "My second React note",
          subtitle: "small note body",
          body: "<h1>My second React note</h1><div>small note body</div>"
      },
  ]);
  const [activeNote, setActiveNote] = useState(null);

  function ChangeActiveNote(noteId) {
    setActiveNote(noteId);
    toggleDrawer();
    console.log(noteId);
}

  function addNote(){
    const newNote = {
      id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1000000,
      title: '',
      subtitle: '',
      body: ''
    }
    setNotes(prevNotes => [...prevNotes, newNote]);
    setActiveNote(newNote.id);
    toggleDrawer();
  }

  function deleteNote(id){
    console.log("delete: " + id);
    console.log("delete: " + activeNote);
    if(activeNote === id){
      setActiveNote(null);
    }
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}>
        <View style={[styles.editorContainer, { backgroundColor: themes[activeTheme].EditorColor }]}>
          <MyEditor 
            toggleDrawer={toggleDrawer} 
            toogleEditing={toogleEditing} 
            footerText={footerText} 
            changeFooterText={changeFooterText}
            note={notes.find(note => note.id === activeNote)}
            activeNote={activeNote}
            themes={themes}
            activeTheme={activeTheme}
            setActiveTheme={setActiveTheme}
            setNotes={setNotes}
          />
        </View>

      <View style={[styles.overlayContainer, { display: isEditing ? '100%' : 'none' }]}>
        <NotesBlock 
          toggleDrawer={toggleDrawer} 
          isDrawerOpen={isDrawerOpen} 
          isEditing={isEditing} 
          toogleEditing={toogleEditing}
          notes={notes}
          activeNote={activeNote}
          handleActiveNote={ChangeActiveNote}
          changeFooterText={changeFooterText} 
          addNote={addNote}
          deleteNote={deleteNote}
        />
      </View>

    </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editorContainer: {
    width: '100%',
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject, // Занимает всю область SafeAreaView, накладывается поверх MyEditor
  },
});

export default App;
