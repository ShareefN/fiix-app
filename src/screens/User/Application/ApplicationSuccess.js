import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import RNRestart from "react-native-restart";

function ApplicationSuccess(props) {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "green", fontSize: 20, textAlign: "center" }}>
          Application Successfully Sent!
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginHorizontal: wp("2%"),
            marginVertical: hp("2%")
          }}
        >
          Your first step into a productive future is complete! Your application
          is now under very professional study, Expect a call within 24 - 48
          hours from the FiiX Team to let you know if your accepted.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => RNRestart.Restart()}
        style={{
          backgroundColor: "black",
          height: hp("7%"),
          marginHorizontal: wp("3%"),
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: hp("10%")
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Go Home!
        </Text>
      </TouchableOpacity>
    </>
  );
}

export default ApplicationSuccess;
