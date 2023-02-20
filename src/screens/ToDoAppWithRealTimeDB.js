import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';

//For getting screens height and width
const {height, width} = Dimensions.get('screen');

const ToDoAppWithRealTimeDB = () => {
  //For storing userinput
  const [input, setInput] = useState(null);

  //For storing data getting from db
  const [Todos, setTodos] = useState(null);

  //For checking data is updated or not
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  //For selected todo id
  const [selectedId, setSelectedId] = useState(null);

  //For reading data from realtime db
  useEffect(() => {
    getDataFromDB();
  }, []);

  //For making read req
  const getDataFromDB = async () => {
    try {
      //   const data = await database().ref('todo').once('value'); //For calling data only once
      //   setTodos(data.val());
      //For calling data on each update
      const data = await database()
        .ref('todo')
        .on('value', tempData => {
          setTodos(tempData.val());
        });
    } catch (err) {
      console.log('Error in reading data from realtime db : ', err);
    }
  };

  //For genrating random Ids
  const generateRandomId = () => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const timestamp = new Date().getTime();
    return result + '_' + timestamp;
  };

  //For adding data in realtime db
  const handleSubmit = async () => {
    try {
      //For adding data in realtime db
      if (input.length > 0) {
        //   const index = generateRandomId();
        const index = Todos.length;
        const response = await database().ref(`todo/${index}`).set({
          value: input,
        });
        setInput('');
      } else {
        alert('Please enetr value & then try again');
      }
    } catch (err) {
      console.log('Error in adding data to realtime db : ', err);
    }
  };

  //For updating data
  const handleUpdate = async () => {
    try {
      if (input.length > 0) {
        const response = await database().ref(`todo/${selectedId}`).update({
          value: input,
        });
        setInput('');
        setIsDataUpdated(false);
      } else {
        alert('Please enetr value & then try again');
      }
    } catch (err) {
      console.log('Error in handling todo update', err);
    }
  };

  //For setting isDataUpdated
  const handleTodoPress = (index, value) => {
    try {
      setIsDataUpdated(true);
      setSelectedId(index);
      setInput(value);
    } catch (err) {
      console.log('Error in seting isDataUpdated', err);
    }
  };

  //For deleting todo
  const handleTodoLongPress = (index, value) => {
    try {
      Alert.alert('Delete', `Are you sure to delete ? \n${value}`, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel is pressed!'),
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const response = await database().ref(`todo/${index}`).remove();
              setInput('');
              setIsDataUpdated(false);
            } catch (err) {
              console.log('Error in deleting todo', err);
            }
          },
        },
      ]);
    } catch (err) {
      console.log('Error in seting isDataUpdated', err);
    }
  };

  //For item to render in flatlist
  const ItemView = item => {
    if (item.item !== null) {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleTodoPress(item.index, item.item.value)}
          onLongPress={() => handleTodoLongPress(item.index, item.item.value)}>
          <Text style={styles.cardText}>{item.item.value}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.heading}>To Do App</Text>
      <View style={styles.formContainer}>
        <TextInput
          value={input}
          onChangeText={value => setInput(value)}
          placeholder="Enter your task"
          style={styles.textInput}
        />
        {!isDataUpdated ? (
          <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add To Do</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonStyle} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update To Do</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.todosContainer}>
        <Text style={styles.heading}>Todo List :- </Text>
        <FlatList
          data={Todos}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ToDoAppWithRealTimeDB;

const styles = StyleSheet.create({
  rootContainer: {flex: 1},
  formContainer: {
    alignItems: 'center',
  },
  heading: {
    margin: 10,
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    width: width - 30,
    padding: 10,
    borderColor: '#666',
    borderRadius: 15,
    borderWidth: 2,
    margin: 10,
  },
  buttonStyle: {
    width: width - 30,
    padding: 10,
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
  todosContainer: {flex: 1},
  card: {
    width: width - 30,
    padding: 15,
    borderColor: 'transparent',
    borderRadius: 15,
    borderWidth: 2,
    margin: 10,
    backgroundColor: '#aaa',
  },
  cardText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
