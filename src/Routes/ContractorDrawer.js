import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RNSecureKeyStore from "react-native-secure-key-store";
import { contractorLogout, getContractor } from "../Api/contractorApi";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import RNRestart from "react-native-restart";
import { DotIndicator } from "react-native-indicators";

function ContractorDrawer(props) {
  const [loadingIndicator, setLoadingIndocator] = useState(false);
  const [contractor, setContractor] = useState({
    name: null,
    number: null
  });

  useEffect(() => {
    me();
  }, []);

  const me = () => {
    RNSecureKeyStore.get("contractor_id").then(async res => {
      await getContractor(res).then(({ data }) => {
        setContractor({
          ...contractor,
          name: data.name,
          number: data.number
        });
      });
    });
  };

  const navItem = (nav, title) => {
    return (
      <TouchableOpacity
        style={{ height: hp("10%") }}
        onPress={() => {
          props.navigation.navigate(nav), props.navigation.closeDrawer();
        }}
      >
        <Text
          style={{
            fontSize: 20
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleLogout = async () => {
    setLoadingIndocator(true);
    await contractorLogout();
    RNRestart.Restart();
  };

  return (
    <View
      style={{ flex: 1 }}
      pointerEvents={loadingIndicator ? "none" : "auto"}
    >
      <View style={{ height: hp("15%"), backgroundColor: "black" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 20
            }}
          >
            {contractor.name}
          </Text>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 15
            }}
          >
            {contractor.number}
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: hp("4%"), marginLeft: wp("5%") }}>
        {navItem("", "Settings")}
        {navItem("", "My Assets")}
        {navItem("", "Something Wrong?")}
        {navItem("terms", "Terms & Conditions")}
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={{ height: hp("10%") }}
        >
          <Text
            style={{
              fontSize: 20
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            flexDirection: "row",
            borderTopColor: "grey",
            borderTopWidth: 1,
            height: 40,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingLeft: 10,
            paddingRight: 10
          }}
        >
          <Text style={{ color: "grey" }}>V 1.0</Text>
        </View>
      </View>
      <DotIndicator color="black" animating={loadingIndicator} />
    </View>
  );
}
export default ContractorDrawer;
