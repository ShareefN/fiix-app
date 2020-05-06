import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../Categories/Components/Header";
import { Input } from "react-native-elements";
import { updateUserpassword, userLogout } from "../../../Api/api";
import RNSecureKeyStore from "react-native-secure-key-store";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

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
    } else {
      RNSecureKeyStore.get("user_id").then(async res => {
        await updateUserpassword(
          res,
          userPassword.oldPassword,
          userPassword.newPassword
        )
          .then(async res => {
            alert("Success");
            await userLogout();
            props.navigation.navigate("userLogin");
          })
          .catch(err => {
            alert("Invalid password");
            setUserPassword({ ...userPassword, oldPassword: "" });
          });
      });
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header
        title="Change Password"
        value="settings"
        navigation={props.navigation}
      />
      <View style={{ marginHorizontal: 20 }}>
        <Input
          placeholder="Old Password"
          label="Old Password"
          secureTextEntry
          value={userPassword.oldPassword}
          containerStyle={{ height: hp("4%"), marginVertical: 30 }}
          onChangeText={value =>
            setUserPassword({ ...userPassword, oldPassword: value })
          }
        />
        <Input
          placeholder="New Password"
          label="New Password"
          secureTextEntry
          value={userPassword.newPassword}
          containerStyle={{ height: hp("4%"), marginVertical: 30 }}
          onChangeText={value =>
            setUserPassword({ ...userPassword, newPassword: value })
          }
        />
        <Input
          placeholder="Confirm New Password"
          label="Confirm New Password"
          secureTextEntry
          value={userPassword.confirmPassword}
          containerStyle={{ height: hp("4%"), marginVertical: 30 }}
          onChangeText={value =>
            setUserPassword({ ...userPassword, confirmPassword: value })
          }
        />
        <TouchableOpacity
          onPress={() => handleUpdatePassword()}
          style={{
            backgroundColor: "black",
          height: hp("7%"),
          marginHorizontal: wp('3%'),
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: hp('7%')
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
