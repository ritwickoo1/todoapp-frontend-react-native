import { View, Text } from "react-native";
import React from "react";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import  Icon  from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
const CameraComponent = ({navigation, route}) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });
    if (!data.canceled) {
      if(route.params.updateProfile)
      return navigation.navigate("profile", {image: data.uri});
      else return navigation.navigate("register", {image: data.uri})
    }
  };
  const takePicture = async () => {
    const data = await camera.takePictureAsync(null);
    if(route.params.updateProfile)
      return navigation.navigate("profile", {image: data.uri});
      else return navigation.navigate("register", {image: data.uri})
    
  };
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera type={type} style={{ flex: 1, aspectRatio: 1 }} ratio="1:1" ref={(e)=>setCamera(e)}/>
        <View
            style={{
                flexDirection: "row",
                position: "absolute",
                bottom: 10,
                justifyContent: "space-evenly",
                width: "100%",
            }}
        >
          <Icon name="image" size={40} color="#fff" onPress={openImagePickerAsync}/>
          <Icon name="camera" size={40} color="#fff" onPress={takePicture}/>
            <Icon name="flip-camera-android" size={40} color="#fff" 
            onPress={()=>
                setType(type === CameraType.back ? CameraType.front : CameraType.back)
            }/>
        </View>
      
    </View>
  );
};

export default CameraComponent;
