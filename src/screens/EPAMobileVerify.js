import React, {useState, createRef} from 'react';
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
import auth from '@react-native-firebase/auth';

const {height, width} = Dimensions.get('screen');

function EPAMobileVerify({navigation}) {
  //For inputs
  const [mobile, setMobile] = useState(null);
  const [otp, setOtp] = useState(null);

  //For errors
  const [mobileError, setMobileError] = useState(null);
  const [otpError, setOtpError] = useState(null);

  //For refs
  const mobileRef = createRef();
  const otpRef = createRef();

  //For confirm data
  const [confirmData, setconsfirmData] = useState(null);

  const handleSend = async () => {
    try {
      let err = validateField(mobile);
      setMobileError(err);
      if (mobile) {
        const mobNo = '+91' + mobile;
        const response = await auth().signInWithPhoneNumber(mobNo);
        console.log('handleSned res =>', response);
        setconsfirmData(response);
        alert('OTP is Send.Please verify it....');
        setMobile(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      let err = validateField(otp);
      setOtpError(err);
      if (otp) {
        const response = await confirmData.confirm(otp);
        console.log('HandleSubmit res =>', response);
        alert('Your number is verified');
        setOtp(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //For validating feild
  const validateField = value => {
    return value ? null : `This field can't be empty`;
  };
  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.heading}>Mobile verify</Text>
          <KeyboardAvoidingView enabled>
            <TextInput
              value={mobile}
              onChangeText={value => {
                setMobile(value);
                let err = validateField(value);
                setMobileError(err);
              }}
              ref={mobileRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmi={false}
              placeholder="Enter your mobile number"
              style={styles.textInput}
            />
            <Text style={styles.error}>{mobileError}</Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={handleSend}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>

            <TextInput
              value={otp}
              onChangeText={value => {
                setOtp(value);
                let err = validateField(value);
                setOtpError(err);
              }}
              ref={otpRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmi={false}
              placeholder="Enter your OTP"
              style={styles.textInput}
            />
            <Text style={styles.error}>{otpError}</Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit OTP</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EPAMobileVerify;

const styles = StyleSheet.create({
  rootContainer: {flex: 1},
  container: {
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
});
