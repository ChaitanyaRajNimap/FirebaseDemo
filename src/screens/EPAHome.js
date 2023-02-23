import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';

//For getting screens height and width
const {height, width} = Dimensions.get('screen');

const EPAHome = ({navigation}) => {
  const email = Auth().currentUser.email;

  //For sign out
  //   const handleSignOut = async () => {
  //     await Auth().signOut();
  //     // navigation.navigate('SignIn');
  //     navigation.dispatch(StackActions.popToTop());
  //     console.log('Reached');
  //   };

  return (
    <View style={styles.rootContainer}>
      {/* <Text style={styles.heading}>Home Screen</Text> */}
      <Text style={styles.heading}>Hello {email}!</Text>
      <TouchableOpacity
        style={[styles.buttonStyle, {backgroundColor: '#00f'}]}
        onPress={() => {
          navigation.navigate('ImageUpload');
        }}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={async () => {
          console.log('Reached');
          await Auth().signOut();
          // navigation.navigate('SignIn');
          //   navigation.dispatch(StackActions.popToTop());
          navigation.dispatch(StackActions.replace('SignIn'));
        }}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EPAHome;

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
  buttonStyle: {
    width: width - 60,
    padding: 15,
    borderColor: 'transparent',
    borderRadius: 15,
    borderWidth: 2,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#f00',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
