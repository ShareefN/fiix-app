import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";

const WIDTH = Dimensions.get("window").width;

function Splash(props) {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate("userLogin");
    }, 2000);
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
      </Animatable.View>
    </View>
  );
}
export default Splash;
