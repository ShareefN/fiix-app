import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import RNSecureKeyStore from "react-native-secure-key-store";
import { userLogout, getUser } from "../Api/api";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import RNRestart from "react-native-restart";
import { DotIndicator } from "react-native-indicators";

function MenuDrawer(props) {
  const [loadingIndicator, setLoadingIndocator] = useState(false);
  const [user, setUser] = useState({
    username: "",
    number: "",
    applicationStatus: ""
  });

  useEffect(() => {
    me();
  }, []);

  const me = () => {
    RNSecureKeyStore.get("user_id").then(async res => {
      await getUser(res)
        .then(({ data }) => {
          setUser({
            ...user,
            username: data.username,
            number: data.number,
            applicationStatus: data.applicationStatus
          });
        })
        .catch(err => console.log(err));
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
    await userLogout();
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
            {user.username}
          </Text>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 15
            }}
          >
            {user.number}
          </Text>
        </View>
      </View>
      <ScrollView
        style={{ marginVertical: hp("4%"), marginLeft: wp("5%") }}
        showsVerticalScrollIndicator={false}
      >
        {user.applicationStatus === "applied" ||
        user.applicationStatus === "rejected"
          ? navItem("applicationStatus", "Application Status")
          : navItem("application1", "Apply With FiiX")}
        {navItem("settings", "Settings")}
        {navItem("feedback", "Something Wrong?")}
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
      </ScrollView>
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

export default MenuDrawer;
