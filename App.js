import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  //For storing database data
  const [dbData, setDbData] = useState(null);

  useEffect(() => {
    //For calling function to get data from database when page render
    getDatabase();
  }, []);

  //For getting database
  const getDatabase = async () => {
    try {
      const data = await firestore()
        .collection('testing')
        .doc('INLltinBbNQUYl8Wp5D2')
        .get();
      setDbData(data._data);
      console.log(data._data);
    } catch (err) {
      console.log('Error in getting database: ', err);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.heading}>
        Name : {dbData ? dbData.name : 'Loading...'}
      </Text>
      <Text style={styles.heading}>
        Age : {dbData ? dbData.age : 'Loading...'}
      </Text>
      <Text style={styles.heading}>
        Hobbies : {dbData ? dbData.hobby.map(list => ` ${list}`) : 'Loading...'}
      </Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 10,
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
