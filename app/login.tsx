// LoginScreen.tsx
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import { useState } from 'react';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Input } from '@/components/input';

export default function LoginScreen() {
  const [nome, setNome] = useState('');
  const [image, setImage] = useState('');

  async function log() {
    await AsyncStorage.setItem('user', String(nome));
    await AsyncStorage.setItem('img', image);
    Alert.alert('Login salvo');
  }

  const handleChoosePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permissão para acessar a galeria é necessária!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImage(uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Input nome="Nome" value={nome} onChangeText={setNome} place="Insira nome user" />

      

      <TouchableOpacity onPress={handleChoosePhoto} style={{ borderWidth: 1, borderColor: 'white', borderRadius: 10, marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Selecionar Foto</Text>
      </TouchableOpacity>

<TouchableOpacity onPress={log} style={{ borderWidth: 1, borderColor: 'white', borderRadius: 10, marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Salvar Login</Text>
      </TouchableOpacity>

      {image ? (
        <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />
      ) : null}
    </View>
  );
}
