import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Header } from "react-native-elements";
import { userLogout } from "../Api/api";
import { contractorLogout } from "../Api/contractorApi";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import RNRestart from "react-native-restart";

function Prohibited(props) {
  const handleLogout = async () => {
    if (props.navigation.getParam("from") === "contractor") {
      await contractorLogout();
    } else {
      await userLogout();
    }
    RNRestart.Restart();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        backgroundColor="white"
        centerComponent={{
          text: "Prohibited",
          style: { color: "black", fontSize: 20 }
        }}
      />
      <Icon name="close" color="red" size={150} />
      <Text
        style={{
          marginVertical: hp("5%"),
          textAlign: "center",
          marginHorizontal: wp("3%"),
          fontSize: 20
        }}
      >
        This account is probihited from using FiiX services
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginHorizontal: wp("5%"),
          fontSize: 20
        }}
      >
        <Text style={{ color: "red" }}>Reason:</Text>{" "}
        {props.navigation.getParam("reason")}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          height: hp("7%"),
          width: wp("90%"),
          marginHorizontal: wp("3%"),
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          marginTop: hp("10%")
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Contact FiiX for revision
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleLogout()}
        style={{
          backgroundColor: "black",
          height: hp("7%"),
          width: wp("90%"),
          marginHorizontal: wp("3%"),
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          marginTop: hp("6%")
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Prohibited;
