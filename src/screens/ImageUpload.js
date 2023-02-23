import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

const {height, width} = Dimensions.get('screen');

const ImageUpload = ({navigation}) => {
  const [imageData, setImageData] = useState(null);
  //For full image ref path to delete
  const [fullImgRefPath, setFullImgRefPath] = useState(null);
  //For image download url
  const [imgDownloadUrl, setImgDownloadUrl] = useState('');

  //For handling pick image
  const handlePickImg = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log('Pick Img res => ', response);
      setImageData(response);
    } catch (err) {
      console.log(err);
    }
  };

  //For handling upload image
  const handleUploadImg = async () => {
    try {
      const response = storage().ref(`/profile/${imageData.name}`);
      const put = await response.putFile(imageData.uri);
      console.log('Upload Img res => ', put);
      setFullImgRefPath(put.metadata.fullPath);
      const url = await response.getDownloadURL();
      setImgDownloadUrl(url);
      alert('Image uploaded successfully');
    } catch (err) {
      console.log(err);
    }
  };

  //For handling upload image
  const handleDeleteImg = async () => {
    try {
      const response = await storage().ref(fullImgRefPath).delete();
      console.log('Delete Img res => ', response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      {/* <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.rootContainer}> */}
      <View style={styles.container}>
        {imageData ? (
          <Image source={{uri: imageData.uri}} style={styles.imageStyle} />
        ) : (
          <Text style={styles.heading}>No Image Found</Text>
        )}
        {/*For picking image */}
        <TouchableOpacity style={styles.buttonStyle} onPress={handlePickImg}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
        {/*For uploading image */}
        <TouchableOpacity style={styles.buttonStyle} onPress={handleUploadImg}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
        {/*For deleting image */}
        <Text style={styles.text}>
          Download url :-{' '}
          {imgDownloadUrl.length > 0 ? imgDownloadUrl : 'Not found'}
        </Text>
        <TouchableOpacity
          style={[styles.buttonStyle, {backgroundColor: '#f00'}]}
          onPress={handleDeleteImg}>
          <Text style={styles.buttonText}>Delete Image</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Image with download url</Text>
        <Image source={{uri: imgDownloadUrl}} style={styles.imageStyle} />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  rootContainer: {flex: 1},
  container: {
    padding: 20,
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 5,
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginBottom: 5,
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageStyle: {
    height: 200,
    width: 200,
    margin: 20,
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
});
