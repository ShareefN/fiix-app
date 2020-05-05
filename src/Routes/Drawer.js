import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RNSecureKeyStore from "react-native-secure-key-store";
import { userLogout, getUser } from "../Api/api";

function MenuDrawer(props) {
  const [user, setUser] = useState({ username: "", number: "" });

  useEffect(() => {
    me();
  });

  const me = () => {
    RNSecureKeyStore.get("user_id").then(async res => {
      await getUser(res)
        .then(({ data }) =>
          setUser({ ...user, username: data.username, number: data.number })
        )
        .catch(err => console.log(err));
    });
  };

  const navItem = (nav, title) => {
    return (
      <TouchableOpacity
        style={{ height: 80, paddingTop: 30 }}
        onPress={() => {
          props.navigation.navigate(nav), props.navigation.closeDrawer();
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 25
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleLogout = async () => {
    await userLogout();
    props.navigation.closeDrawer();
    props.navigation.navigate("userLogin");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 128, backgroundColor: "black" }}>
        <View
          style={{
            flex: 1,
            marginTop: 30,
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
      {navItem("", "Apply With FiiX")}
      {navItem("settings", "Settings")}
      {navItem("", "Something Wrong?")}
      {navItem("terms", "Terms & Conditions")}
      <TouchableOpacity
        onPress={() => handleLogout()}
        style={{ height: 80, paddingTop: 30 }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 25
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>

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
    </View>
  );
}

export default MenuDrawer;
