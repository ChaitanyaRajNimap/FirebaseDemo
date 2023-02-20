import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//For firestore db
import firestore from '@react-native-firebase/firestore';
//For realtime db
import database from '@react-native-firebase/database';
import ToDoAppWithRealTimeDB from './src/screens/ToDoAppWithRealTimeDB';

const App = () => {
  //For storing firestore database data
  const [dbData, setDbData] = useState(null);

  // useEffect(() => {
  //   //For calling function to get data from database when page render
  //   getDatabase();
  // }, []);

  //For getting database
  // const getDatabase = async () => {
  //   try {
  //     // //For firestore database
  //     // const data = await firestore()
  //     //   .collection('testing')
  //     //   .doc('INLltinBbNQUYl8Wp5D2')
  //     //   .get();
  //     // setDbData(data._data);
  //     // console.log(data._data);

  //     //For realtime database
  //     const data = await database().ref('users/1').once('value');
  //     setDbData(data.val());
  //     // console.log(data);
  //   } catch (err) {
  //     console.log('Error in getting database: ', err);
  //   }
  // };

  return (
    <View style={styles.rootContainer}>
      {/* //For firestore
      <Text style={styles.heading}>
        Name : {dbData ? dbData.name : 'Loading...'}
      </Text>
      <Text style={styles.heading}>
        Age : {dbData ? dbData.age : 'Loading...'}
      </Text>
      <Text style={styles.heading}>
        Hobbies : {dbData ? dbData.hobby.map(list => ` ${list}`) : 'Loading...'}
      </Text> */}

      {/*For realtime db*/}
      {/* <Text style={styles.heading}>
        Name : {dbData ? dbData.name : 'Loading...'}
      </Text>
      <Text style={styles.heading}>
        Age : {dbData ? dbData.age : 'Loading...'}
      </Text> */}

      <ToDoAppWithRealTimeDB />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    marginBottom: 10,
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
