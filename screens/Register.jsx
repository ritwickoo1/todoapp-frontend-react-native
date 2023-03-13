import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { register } from "../redux/action";
import mime from "mime";

const Register = ({navigation,route}) => {
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handleImage = () => {
        navigation.navigate("camera",{
            updateProfile: false
        });
    };
    const registerHandler = () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("avatar", {
            uri: avatar,
            type: mime.getType(avatar),
            name: avatar.split("/").pop()
        })
       dispatch(register(myForm));
    };
    useEffect(() => {
        if (route.params) {
            if(route.params.image)
            setAvatar(route.params.image);
        }
    }, [route]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar.Image
        size={100}
        source={{ uri: avatar ? avatar : null }}
        style={{ backgroundColor: "#900" }}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={{ color: "#900", margin: 10 }}>Change Avatar</Text>
      </TouchableOpacity>
      <View style={{ width: "70%" }}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput 
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
        />

      </View>
      <Button
        disabled={!name || !email || !password}
        style={styles.btn}
        onPress={registerHandler}
        >
        <Text style={{ color: "#fff" }}>REGISTER</Text>
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={{ color: "#900", height: 30, margin: 20 }}>Have an Account, Login</Text>
        </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
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
  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
    justifyContent: "center",
    borderRadius: 0,
  },
});
export default Register;
