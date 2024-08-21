import {View, Image} from 'react-native';

export default function emojiSticker( { imageSize, stickerSource}){
    return (
        <View style= {{top : -350}}>
            <Image
            source={stickerSource}
            resizeMode='contain'
            style={{width: imageSize, height: imageSize}}
            />
        </View>
    )
}