import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "rgb(50,50,50)",
        padding: 30,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <Icon name="home" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <Icon name="user" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
