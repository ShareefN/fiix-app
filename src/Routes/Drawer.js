import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RNSecureKeyStore from "react-native-secure-key-store";
import { userLogout } from "../Api/api";

function MenuDrawer(props) {
  const [username, setUsername] = useState("");
  const [userNumber, setUserNumber] = useState("");

  useEffect(() => {
    RNSecureKeyStore.get("username")
      .then(res => {
        setUsername(res);
      })
      .catch(err => {
        console.log(err);
      });

    RNSecureKeyStore.get("user_number")
      .then(res => {
        setUserNumber(res);
      })
      .catch(err => console.log(err));
  });

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
            {username}
          </Text>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              marginVertical: 10
            }}
          >
            {userNumber}
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
