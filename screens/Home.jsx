import {
  View,
  Text,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Task from "../components/Task";
import Icon from "react-native-vector-icons/Entypo";
import { Button, Dialog } from "react-native-paper";
import { useState } from "react";
const Home = ({ navigation }) => {
  const tasks = [
    {
      _id: "1",
      title: "Task 1",
      description: "Task 1 description",
      completed: false,
    },
    {
      _id: "2",
      title: "Task 2",
      description: "Task 2 description",
      completed: false,
    },
  ];
  const [openDialog, setOpenDialog] = useState(false);
  const hideDialog = () => setOpenDialog(!openDialog);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addTaskHandler = () => {
    console.log(title, description);
  };
  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <ScrollView>
          <SafeAreaView>
            <Text style={styles.heading}>All Task</Text>
            {tasks.map((item) => (
              <Task
                key={item._id}
                title={item.title}
                description={item.description}
                status={item.completed}
                taskId={item._id}
              />
            ))}

            <TouchableOpacity style={styles.addBtn} onPress={hideDialog}>
              <Icon name="add-to-list" size={30} color="#900" />
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>
      <Dialog visible={openDialog} onDismiss={hideDialog}>
        <Dialog.Title>ADD A TASK</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={hideDialog}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <Button onPress={addTaskHandler}>
              <Text>ADD</Text>
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
    color: "#fff",
    backgroundColor: "#474747",
  },
  addBtn: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    elevation: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Home;
