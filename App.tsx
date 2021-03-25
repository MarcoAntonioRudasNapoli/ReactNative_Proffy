import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Landing from './src/pages/Landing/index'

import AppLoading from 'expo-app-loading';
import {Poppins_400Regular, Poppins_600SemiBold, useFonts} from '@expo-google-fonts/poppins'
import {Archivo_400Regular, Archivo_700Bold} from '@expo-google-fonts/archivo'

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  })
  
  if (!fontsLoaded) { //enquanto as fontes não estiverem carregadas
    return <AppLoading/>;
  } else {
    return (
      <>
        <Landing/>
        <StatusBar style="light" />
      </>
    );
  }
}
