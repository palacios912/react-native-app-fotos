import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

import ImageViewer from './componentes/ImageViewer';
import Button from './componentes/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const PlaceholderImage = require('./assets_expo/images/background-image.png');

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri);
    }else{
      alert('No seleccionaste ninguna imagen');
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer} >
        <ImageViewer 
        placeholderImageSource={PlaceholderImage}
        selectedImage ={selectedImage}
        ></ImageViewer>
      </View>

      <View style={styles.footerContainer} >
        <Button theme="primary" label='Escoja una foto' onPress={pickImageAsync}/>
        <Button label= 'Use esta foto'/>
      </View>

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
  
});
