import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Tabs } from "expo-router";
import { Image, Text, View } from 'react-native';
   import ImagePicker from 'react-native-image-picker';
   
import { useColorScheme } from '@/components/useColorScheme';



function RootLayoutNav() {
  const colorScheme = useColorScheme();


  return (
    
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

<Tabs> 

<Tabs.Screen  name='index'>


</Tabs.Screen>

<Tabs.Screen  name='home'>


</Tabs.Screen>




</Tabs>


    </ThemeProvider>
  );
}

export default RootLayoutNav;