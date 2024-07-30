import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button, Text, TouchableWithoutFeedback } from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import MoreBtn from './MoreBtn';

//Library
import { createHTML } from '../node_modules/react-native-pell-rich-editor/src/editor'; // Путь к вашему файлу editor.js

//IMG's
import makeH1Ico from '../assets/favicon.png';
import titleIco from '../assets/title1.png';
import fullscreenIco from '../assets/fullscreen.png';
import moreBtnIco from '../assets/more.png';
import listIco from '../assets/list.png';


const MyEditor = ({ toggleDrawer, toogleEditing, footerText, changeFooterText, activeNote, note, themes, activeTheme, setActiveTheme, setNotes }) => {
  const richText = React.useRef();

  const [moreBtnActive, handleMoreBtnActive] = useState(false);
  const [fullscreenActive, handleFullscreenActive] = useState(false);

  const moreBtn = () => {
    handleMoreBtnActive(!moreBtnActive);
  }

  const noMoreBtn = () =>{
    handleMoreBtnActive(false);
  }

  const hideKeyboard = () => {
    if (richText.current) {
      richText.current.blurContentEditor();
    }
  };

  const fullscreenBtn = () => {
    hideKeyboard();
    noMoreBtn();
    handleFullscreenActive(!fullscreenActive);
    toggleDrawer();
    toogleEditing();
    saveNote(text);
  }


  const handleSave = async () => {
    const htmlContent = await richText.current.getContentHtml();
    console.log("HTML content:", htmlContent);
    // Here you can send the htmlContent to your server or handle it as needed
  };


  const initialHtmlContent = note ? note.body : '<p className="grey-text">Your awesome note</p>';
  const [text, setText] = useState(initialHtmlContent);

  const [isDisabled, setIsDisabled] = useState(false);
  // Обновление текста при изменении пропса note
  useEffect(() => {
    if (note) {
        setIsDisabled(false);
        setText(note.body);
        richText.current.setContentHTML(note.body);
    }
    else if(!note){
      setText('Change your note or begin a new one');
      richText.current.setContentHTML('<div style="height: 100vh; justify-content: center; align-items: center; display: flex;"><h3 style="color: rgb(67, 165, 219); font-weight: 400;">Change your note or begin a new one</h3></div>');
      setIsDisabled(true);
    }
  }, [note])


  const saveNote = (body) =>{
    setNotes(prevNotes =>
      prevNotes.map(thisNote => thisNote.id === activeNote ? {...thisNote, body: body} : thisNote)
    )
  }

  // Функция для обновления состояния текста
  const handleChange = (html) => {
    setText(html);
    console.log(html);
  };

  const contentStyle = {
    color: themes[activeTheme].EditorTextColor,
  }

  return (
    <View style={styles.container}>
        <RichEditor
          ref={richText}
          style={styles.richEditor}
          editorStyle={contentStyle}
          placeholder="Start writing here..."
          onChange={handleChange}
          onFocus={() => noMoreBtn()}
          disabled = {isDisabled}
        />
      <MoreBtn moreBtnActive={moreBtnActive} setActiveTheme={setActiveTheme} activeTheme={activeTheme}></MoreBtn>
      <RichToolbar style={{backgroundColor: themes[activeTheme].EditorToolbarColor} }
        editor={richText}
        actions={[ 'fullscreenBtn', actions.insertBulletsList, ' ', ' ', ' ', ' ', ' ' , actions.heading1, actions.setBold, 'moreBtn']}
        iconMap={{
          fullscreenBtn: fullscreenIco,
          moreBtn: moreBtnIco,
          [actions.heading1]: titleIco,
          [actions.setTextColor]: makeH1Ico,
          [actions.insertBulletsList]: listIco,
        }}
        moreBtn={moreBtn}
        fullscreenBtn={fullscreenBtn}
        iconTint={themes[activeTheme].EditorToolbarButtonColor}
      />
      <Button title={footerText} onPress={noMoreBtn}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  richEditor: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)' /// Hide a default color, don't Touch!
  },
});

export default MyEditor;
