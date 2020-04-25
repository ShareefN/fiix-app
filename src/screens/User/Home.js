import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { userLogout } from "../../Api/api";

function UserHome(props) {
  const hanldeLogout = async () => {
    await userLogout();
    props.navigation.navigate("userLogin");
  };

  return (
    <SafeAreaView>
      <Text>User Home</Text>
      <TouchableOpacity onPress={() => hanldeLogout()}>
        <Text>logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default UserHome;
