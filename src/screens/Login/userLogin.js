import React, { useState } from "react";
import { Text, Button, TextInput, Image, View } from "react-native";
import { userLogin } from "../../Api/api";

function Email(props) {
  const login = async (email, password) => {
    return userLogin("shareef@gmail.com", "123123")
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-end"
      }}
    ></View>
  );
}

export default Email;
