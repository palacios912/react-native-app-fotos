import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

import ImageViewer from './componentes/ImageViewer';
import Button from './componentes/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import IconButton from './componentes/IconButton';
import CircleButton from './componentes/CircleButton';
import EmojiPicker from './componentes/EmojiPicker';
import EmojiList from './componentes/EmojiList';
import EmojiSticker from './componentes/EmojiSticker';
const PlaceholderImage = require('./assets_expo/images/background-image.png');

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  //comportamiento pick de imagenes
  const pickImageAsync = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }else{
      alert('No seleccionaste ninguna imagen');
    }
  }
  //comportamiento botones opciones
  const onReset = () =>{
    setShowAppOptions(false);
  };
  const onAddSticker = () =>{
   setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  }
  const onSaveImageAsync = async () =>{
    //implementar luego
  };


  return (
    <View style={styles.container}>

      <View style={styles.imageContainer} >
        <ImageViewer 
        placeholderImageSource={PlaceholderImage}
        selectedImage ={selectedImage}
        />
        {pickedEmoji} && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>
      {/* emojispicker*/}     
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
      </View>
      {showAppOptions ? (
        //botones iconos
       <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}> 
            <IconButton icon="refresh" label ='Reiniciar' onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon="save-alt" label="Guardar" onPress={onSaveImageAsync}/>
          </View>
       </View>
    ) : (
      <View style={styles.footerContainer} >
        <Button theme="primary" label='Escoja una foto' onPress={pickImageAsync}/>
        <Button label= 'Use esta foto' onPress={() => setShowAppOptions(true)}/>
      </View>
      ) }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
   
  },
  imageContainer:{
    flex: 1,
    paddingTop: 58,
  },
  footerContainer:{
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer:{
    position: 'absolute',
    bottom: 80,
  },
  optionsRow:{
    alignItems: 'center',
    flexDirection: 'row',
  },
  
});
