import { StatusBar } from 'expo-status-bar';
import {  Platform, StyleSheet, TouchableOpacity, ScrollView, Image, RefreshControl, Alert } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {  View } from '@/components/Themed';
import {Text, Button, TextInput, ActivityIndicator, Badge, Card, Checkbox, IconButton, List, MD2Colors, Portal, ProgressBar, Searchbar, Snackbar, PaperProvider, Dialog } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import {Input} from "../components/input/index"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalScreen() {

const [comments, setComments] = useState<any[]>([]);
const [posts, setPosts] = useState<any[]>([]);
const [postId, setPostId] = useState(0);
const [nome,setNome]= useState("");
const [img,setImage]= useState("");

let urlPost= "http://10.0.0.125:3000/posts";
let urlComment= "http://10.0.0.125:3000/comentarios";
let urlUser= "http://10.0.0.125:3000/user";

// http://10.0.0.125:3000/posts
// http://10.0.0.125:3000/user
// http://10.0.0.125:3000/comentarios

useEffect(() => {
  axios.get(urlPost)
    .then(function (response) {
      setPosts(response.data);

      if (response.data && response.data.length > 0) {
         const lastPostId = response.data[response.data.length - 1].id;
        console.log('ID do último post:', lastPostId);
        setPostId(lastPostId);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  axios.get(urlComment)
    .then(function (response) {
      setComments(response.data);
    })
    .catch(function (error) {
      console.log(error);
      console.log('Erro ao carregars');
    });

const getStorage = async () =>{
  try {
    const value = await AsyncStorage.getItem('user');
    const value2= await AsyncStorage.getItem('img');
    if(value !== null) {
      setNome(value)
      }

         if(value2 !== null) {
      setImage(value2)
      }

      } catch (error) {
        console.warn(error);
        }
      


}

getStorage();


}, []);

function Postcoment(idPost: number){

axios.post(urlComment, {
  postId: idPost,
  id: postId+1,
  comments: {
    id: idPost, 
    author: nome,
    text: commentsText,
    image: img
  }
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});

reset();
reset();

}



   const [searchQuery, setSearchQuery] = useState('');

function reset(){

 axios.get(urlPost)
    .then(function (response) {

      setPosts(response.data);

    })
    .catch(function (error) {
      console.log(error);
    });

 axios.get(urlComment)
    .then(function (response) {

      setComments(response.data);
              console.log('foi resetado');

    })
    .catch(function (error) {
      console.log(error);
              console.log('Erro ao carregars');

    });

}
const [commentsText, setComentText] = useState('');


  return (
   
<ScrollView> 

  <View>
<TouchableOpacity
onPress={reset}
    
>
  <Text style={{color: "white"}}>Reset</Text>
</TouchableOpacity>




 <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />

{posts
      .filter(item => item.id==searchQuery || item.title.includes(searchQuery) || item.body.includes(searchQuery))
      .map((item, index) => (
        <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
        
          <Text style={{color: "cyan", fontSize: 20}}>{item.title}</Text>

          <Text style={{color: "white"}}>{item.author}</Text>
          <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
<Input 
  nome='Oi'
  place="Digite seu comentário..."
  onChangeText={(text) => setComentText(text)}
  value={commentsText}
/>


<TouchableOpacity
            onPress={() => Postcoment(item.id)}



    style={{borderWidth: 1, borderColor: "white", borderRadius: 10}}
>
  <Text style={{color: "white"}}>Enviar coment</Text>
</TouchableOpacity>

     {comments
   .filter(comment => comment.postId === item.id)
        .flatMap(commentGroup => commentGroup.comments)
        .map((comment, commentIndex) => (
          <View 
            key={commentIndex} 
            style={{ 
              padding: 10, 
              marginTop: 5,
              borderWidth: 1, 
              borderColor: '#555', 
              borderRadius: 5,
              width: '90%'
            }}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image 
                source={{ uri: comment.image }} 
                style={{ width: 30, height: 30, marginRight: 10 }} 
              />
              <Text style={{color: "white", fontWeight: 'bold'}}>{comment.author}</Text>
            </View>
            <Text style={{color: "white", marginTop: 5}}>{comment.text}</Text>
          </View>
        ))}
    </View>
 
      ))} 



    </View>

  </ScrollView>

  );
}