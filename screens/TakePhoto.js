import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Camera } from "expo-camera";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

export default function TakePhoto() {
  const [ok, setOk] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const requestPermissions = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setOk(status);
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <Container>
      <Camera type={cameraType} style={{ flex: 1 }} />
      <Actions>
        <TakePhotoBtn></TakePhotoBtn>
        <TouchableOpacity></TouchableOpacity>
      </Actions>
    </Container>
  );
}