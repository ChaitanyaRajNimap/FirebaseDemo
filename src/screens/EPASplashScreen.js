import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';

function EPASplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      //For checking user authh state
      Auth().onAuthStateChanged(user => {
        const routeName = user !== null ? 'Home' : 'SignIn';
        // navigation.navigate(routeName);
        navigation.dispatch(StackActions.replace(routeName));
      });
    }, 3000);
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.heading}>Loading...</Text>
    </View>
  );
}

export default EPASplashScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
