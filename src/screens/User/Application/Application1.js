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
      <Header title="Application" navigation={props.navigation} />
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
            fontSize: 16,
            letterSpacing: 1.5
          }}
        >
          Design Your Day with FiiX, Make it productive and beneficial for you
          and everyone around who is waiting for your service!
        </Text>
        <Text> ──────────────────</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            letterSpacing: 1.5
          }}
        >
          To be among the FiiX team, you should have a fresh copy of A
          Non-criminal document and / or A valid Passport / ID identification
        </Text>
        <Text> ──────────────────</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            letterSpacing: 1.5
          }}
        >
          Intested? Apply Now!
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
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            letterSpacing: 7
          }}
        >
          Let's Go
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Application1;
