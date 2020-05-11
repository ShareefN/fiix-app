import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import * as Animatable from "react-native-animatable";

function Splash(props) {
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
