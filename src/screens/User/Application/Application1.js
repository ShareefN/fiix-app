import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../Categories/Components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

function Application1(props) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="Make $$ With FiiX" navigation={props.navigation} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
          marginHorizontal: wp("10%")
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16
          }}
        >
          Complete this 2 step application today and expect a call from FiiX if you
          are aligable to become part of the team!
        </Text>
        <Text> ──────────────────</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16
          }}
        >
          Make sure you send a new copy of your Non-criminal document, along
          with and image of you ID or Password to finish you application.
        </Text>
        <Text> ──────────────────</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16
          }}
        >
          You only have one chance! So make it count.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("application2")}
        style={{
          backgroundColor: "black",
          height: hp("7%"),
          marginHorizontal: wp("3%"),
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: hp("7%")
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Start Application
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Application1;
