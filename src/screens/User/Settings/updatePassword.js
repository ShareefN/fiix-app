import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../Categories/Components/Header";
import { Input } from "react-native-elements";
import { updateUserpassword } from "../../../Api/api";

function UpdatePassword(props) {
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleUpdatePassword = async () => {
    if (userPassword.newPassword !== userPassword.confirmPassword) {
      alert("Those password dont match");
      setUserPassword({ ...userPassword, newPassword: "", oldPassword: "" });
    }

    await updateUserpassword(userPassword)
      .then(res => {
        alert("Success");
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header
        title="Change Password"
        value="settings"
        navigation={props.navigation}
      />
      <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
        <Input
          placeholder="Old Password"
          label="Old Password"
          secureTextEntry
          value={userPassword.oldPassword}
          containerStyle={{ marginVertical: 20 }}
          onChangeText={value =>
            setUserPassword({ ...userPassword, oldPassword: value })
          }
        />
        <Input
          placeholder="New Password"
          label="New Password"
          secureTextEntry
          value={userPassword.newPassword}
          containerStyle={{ marginVertical: 20 }}
          onChangeText={value =>
            setUserPassword({ ...userPassword, newPassword: value })
          }
        />
        <Input
          placeholder="Confirm New Password"
          label="Confirm New Password"
          secureTextEntry
          value={userPassword.confirmPassword}
          containerStyle={{ marginVertical: 20 }}
          onChangeText={value =>
            setUserPassword({ ...userPassword, confirmPassword: value })
          }
        />
        <TouchableOpacity
        onPress={() => handleUpdatePassword()}
          style={{
            backgroundColor: "black",
            height: 50,
            marginHorizontal: 20,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Update Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UpdatePassword;
