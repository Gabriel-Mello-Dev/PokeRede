// PostScreen.tsx
import { View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Text } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Input } from '@/components/input';

export default function PostScreen() {
  const [nome, setNome] = useState('');
  const [imgUser, setImgUser] = useState('');
  const [titulo, setTitulo] = useState('');
  const [img2, setImage2] = useState('');
  const [postId, setPostId] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);

  const urlPost = 'http://10.0.0.125:3000/posts';
  const urlComment = 'http://10.0.0.125:3000/comentarios';

 useEffect(() => {
  const fetchData = async () => {
    try {
      const postRes = await axios.get(urlPost);
      setPosts(postRes.data);
      const lastId = postRes.data?.[postRes.data.length - 1]?.id ?? 0;
      setPostId(lastId);

      const commentRes = await axios.get(urlComment);
      setComments(commentRes.data);

      const value = await AsyncStorage.getItem('user');
      const value2 = await AsyncStorage.getItem('img');
      if (value) setNome(value);
      if (value2) setImgUser(value2);
    } catch (err) {
      console.log('Erro no fetch:', err);
    }
  };

  fetchData();

  const interval = setInterval(fetchData, 5000);

  return () => clearInterval(interval);
}, []);


  const PostPost = () => {
    if (!nome) {
      Alert.alert('Erro', 'Você precisa estar logado!');
      return;
    }

    axios.post(urlPost, {
      id: postId + 1,
      author: nome,
      image: img2,
      title: titulo,
    })
    .then((response) => {
      console.log(response);
      Alert.alert('Post enviado com sucesso!');
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Erro ao postar');
    });
  };

  const handleChoosePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permissão para acessar a galeria é necessária!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage2(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 16, marginBottom: 10 }}>Olá, {nome}</Text>

      <Input nome="Título" value={titulo} onChangeText={setTitulo} place="Digite o título do post" />

      <TouchableOpacity onPress={handleChoosePhoto} style={{ borderWidth: 1, borderColor: 'white', borderRadius: 10, marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {img2 ? (
        <Image source={{ uri: img2 }} style={{ width: 200, height: 200, marginTop: 10 }} />
      ) : null}

      <TouchableOpacity onPress={PostPost} style={{ borderWidth: 1, borderColor: 'white', borderRadius: 10, marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Enviar Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
