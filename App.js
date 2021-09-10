// In App.js in a new project

import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, ColorPropType, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Video from 'react-native-video';
import Home from './components/Home';
import { Homefunction } from './components/Homefunction';

const { height } = Dimensions.get("window");

function HomeScreen({ navigation }) {

  return (
    <View>
      <Video
        source={require('./components/video.mp4')}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={"cover"}
        rate={1.0}
        ignoreSilentSwitch={"obey"}
      />
      <View style={styles.container}>
        <Text onPress={() => navigation.navigate('Game')} style={styles.getstarted}>Get Started</Text>
      </View>
    </View>
  );
}

function GameScreen() {
  return (
    <Homefunction />
  );
}



const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  getstarted: {
    top: 700,
    left: 115,
    width: 150,
    height: 50,
    backgroundColor: '#4c6986',
    color: '#fff',
    textAlign: 'center',
    padding: 15,
    borderRadius: 25
  },
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  }
});

const image = { uri: 'https://res.cloudinary.com/dm7i7i9wg/image/upload/v1630949036/Projects/Screenshot_2021-09-04-10-15-31-795_com.android.chrome_ble472.jpg' };

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Game' component={GameScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;