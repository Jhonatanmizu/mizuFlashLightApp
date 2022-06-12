import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import { StyleSheet, Text, View, SafeAreaView, Image, Touchable, Button, Alert, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake'
// import Torch from 'react-native-torch';
const primaryColor = '#F0DBAA'
const secondaryColor = '#DBAE96'
const altColor = '#f8f8f8'
export default function App() {

  let [toggleContainerStyle, setContainerStyle] = useState(false);
  function changeContainerStyle() {
    setContainerStyle(!toggleContainerStyle)
  }

  useEffect(() => {
    try {

      await Torch.switchState(toggleContainerStyle)
    } catch (error) {
      ToastAndroid.show(
        'We seem to have an issue accessing your torch',
        ToastAndroid.SHORT
      )
    }
  }, [toggleContainerStyle])

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setContainerStyle(!toggleContainerStyle)
    })
    return subscription.remove()
  }, [toggleContainerStyle])
  return (

    <View style={toggleContainerStyle ? styles.container : styles.containerLight}>
      <Text style={styles.title}>"Seja luz nesse dia cizento" - Emicida </Text>
      {/* <StatusBar style="auto" /> */}
      <Image style={styles.mainImage} source={toggleContainerStyle ? require('./assets/stars.svg') : require('./assets/sun.svg')} ></Image>
      {/* <UilReact size="200" color={primaryColor}></UilReact> */}
      <TouchableOpacity color={!toggleContainerStyle ? '#333' : primaryColor} onPress={() => changeContainerStyle()} style={styles.btn} >
        <Text style={styles.btnText}> {toggleContainerStyle ? 'Ligar' : 'Desligar'}</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    color: altColor,
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    color: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: secondaryColor,
  },
  title: {
    fontSize: 24,
    color: altColor,
    fontWeight: 'bold',
    margin: 2,
    fontFamily: 'Open sans',
  },
  mainImage: {
    resizeMode: 'contain',
    maxWidth: 300,
    minHeight: 300,
    minWidth: 300,
    maxHeight: 300,
    borderRadius: 150,
    backgroundColor: altColor,
    borderColor: altColor,
    borderWidth: 2
  },
  btn: {
    width: "7rem",
    height: "3rem",
    marginTop: 5,
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: primaryColor
  },
  btnText: {
    fontWeight: '700',
    fontFamily: 'Oswald',
  }
});
