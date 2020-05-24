import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import Header from "../Categories/Components/Header";
import { Input } from "react-native-elements";
import { updateUserpassword, userLogout } from "../../../Api/api";
import RNSecureKeyStore from "react-native-secure-key-store";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { DotIndicator } from "react-native-indicators";
import RNRestart from "react-native-restart";
import AdLargeBanner from "../../../Admobs/LargeBanners";

function UpdatePassword(props) {
  const [loadingIndicator, setLoadingIndocator] = useState(false);
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleUpdatePassword = async () => {
    if (userPassword.newPassword !== userPassword.confirmPassword) {
      Alert.alert("Those password dont match");
      setUserPassword({ ...userPassword, newPassword: "", oldPassword: "" });
    } else {
      setLoadingIndocator(true);
      RNSecureKeyStore.get("user_id").then(async res => {
        await updateUserpassword(
          res,
          userPassword.oldPassword,
          userPassword.newPassword
        )
          .then(async res => {
            Alert.alert("Success");
            await userLogout();
            RNRestart.Restart();
          })
          .catch(err => {
            setLoadingIndocator(false);
            Alert.alert("Invalid password");
            setUserPassword({ ...userPassword, oldPassword: "" });
          });
      });
    }
  };

  return (
    <View
      style={{ backgroundColor: "white", flex: 1 }}
      pointerEvents={loadingIndicator ? "none" : "auto"}
    >
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
            marginHorizontal: wp("3%"),
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: hp("7%")
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Update Password
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {Platform.OS === "ios" ? (
            <AdLargeBanner id={"ca-app-pub-6510981239392097/1908185990"} />
          ) : (
            <AdLargeBanner id={"ca-app-pub-6510981239392097/9056612925"} />
          )}
        </View>
      </View>
      <DotIndicator color="black" animating={loadingIndicator} />
    </View>
  );
}

export default UpdatePassword;
