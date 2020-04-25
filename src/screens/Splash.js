import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import RNSecureKeyStore from "react-native-secure-key-store";

const WIDTH = Dimensions.get("window").width;

function Splash(props) {
  const [loading, setLoading] = useState("none");
  useEffect(() => {
    setLoading("flex");
    RNSecureKeyStore.get("user_token")
      .then(res => {
        props.navigation.navigate("userHome");
      })
      .catch(err => {
        RNSecureKeyStore.get('contractor_token')
        .then(res => props.navigation.navigate('contractorHome'))
        .catch(err => props.navigation.navigate('userLogin'))
      });
    setLoading("none");
  });

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Animatable.View
        animation="zoomIn"
        iterationCount={1}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          width: WIDTH,
          height: 150,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ fontSize: 80, color: "white" }}>FiiX</Text>
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ display: loading }}
        />
      </Animatable.View>
    </View>
  );
}

export default Splash;
