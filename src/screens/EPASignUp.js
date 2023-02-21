import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

//For getting screens height and width
const {height, width} = Dimensions.get('screen');

const EPASignUp = ({navigation}) => {
  //For storing inputs
  const [inputs, setInputs] = useState({
    email: null,
    password: null,
  });
  //For errors
  const [error, setError] = useState({
    emailError: null,
    passwordError: null,
  });

  //Ref for inputs
  const emailRef = createRef();
  const passwordRef = createRef();

  //For handling sign up
  const handleSignUp = async () => {
    try {
      let emailErr = validateField(inputs.email);
      let passwordErr = validateField(inputs.password);

      setError(prevErr => {
        return {
          ...prevErr,
          emailError: emailErr,
          passwordError: passwordErr,
        };
      });

      if (!emailErr && !passwordErr) {
        // console.log('Email : ', inputs.email);
        // console.log('Password : ', inputs.password);
        setInputs(prevInputs => {
          return {
            ...prevInputs,
            email: null,
            password: null,
          };
        });

        const isUserCreated = await auth().createUserWithEmailAndPassword(
          inputs.email,
          inputs.password,
        );

        console.log('Created User => ', isUserCreated);
        if (isUserCreated) {
          navigation.navigate('SignIn');
        }
      }
    } catch (err) {
      console.log('Error in sign up with firebase ', err);
      alert(err.message);
    }
  };

  //For validating feild
  const validateField = value => {
    return value ? null : `This field can't be empty`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.rootContainer}>
          <Text style={styles.heading}>Sign Up</Text>
          <KeyboardAvoidingView enabled>
            <TextInput
              value={inputs.email}
              onChangeText={value => {
                setInputs(prevInputs => {
                  return {
                    ...prevInputs,
                    email: value,
                  };
                });
                let error = validateField(value);
                setError(prevErr => {
                  return {
                    ...prevErr,
                    emailError: error,
                  };
                });
              }}
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordRef.current && passwordRef.current.focus()
              }
              blurOnSubmit={false}
              placeholder="Enter your email"
              style={styles.textInput}
            />
            <Text style={styles.error}>{error.emailError}</Text>
            <TextInput
              value={inputs.password}
              onChangeText={value => {
                setInputs(prevInputs => {
                  return {
                    ...prevInputs,
                    password: value,
                  };
                });
                let error = validateField(value);
                setError(prevErr => {
                  return {
                    ...prevErr,
                    passwordError: error,
                  };
                });
              }}
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              placeholder="Enter your password"
              style={styles.textInput}
              secureTextEntry={true}
            />
            <Text style={styles.error}>{error.passwordError}</Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signin}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signinText}>
                Already Have Account? Sign In here{' '}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EPASignUp;

const styles = StyleSheet.create({
  container: {flex: 1},
  rootContainer: {
    padding: 20,
    flex: 1,
  },
  heading: {
    marginBottom: 10,
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    width: width - 60,
    padding: 10,
    borderColor: '#666',
    borderRadius: 15,
    borderWidth: 2,
    margin: 10,
  },
  buttonStyle: {
    width: width - 60,
    padding: 15,
    borderColor: 'transparent',
    borderRadius: 15,
    borderWidth: 2,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#00f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  error: {
    marginBottom: 5,
    marginHorizontal: 15,
    color: '#f00',
    fontSize: 15,
  },
  signin: {
    margin: 10,
    alignItems: 'center',
  },
  signinText: {
    color: '#00f',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
