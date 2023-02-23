import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EPASplashScreen from './src/screens/EPASplashScreen';
import EPASignIn from './src/screens/EPASignIn';
import EPASignUp from './src/screens/EPASignUp';
import EPAHome from './src/screens/EPAHome';
import FirestoreSignUp from './src/screens/FirestoreSignUp';
import EPAMobileVerify from './src/screens/EPAMobileVerify';
import ImageUpload from './src/screens/ImageUpload';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="MobileVerify"
          component={EPAMobileVerify}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="SplashScreen"
          component={EPASplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={EPASignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={EPASignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={EPAHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImageUpload"
          component={ImageUpload}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="FirestoreSignUp"
          component={FirestoreSignUp}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
