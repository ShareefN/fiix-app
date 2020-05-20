import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Input } from "react-native-elements";
import RNSecureKeyStore from "react-native-secure-key-store";
import Header from './Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { DotIndicator } from "react-native-indicators";
import { updatePassword, contractorLogout } from "../../../Api/contractorApi";
import RNRestart from "react-native-restart";

function UpdatePassword(props) {
  const [loadingIndicator, setLoadingIndocator] = useState(false);
  const [contractorPassword, setContractorPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleUpdatePassword = async () => {
    if (contractorPassword.newPassword !== contractorPassword.confirmPassword) {
      Alert.alert("Those password dont match");
      setContractorPassword({
        ...contractorPassword,
        newPassword: "",
        oldPassword: "",
        confirmPassword: '',
      });
    } else {
      setLoadingIndocator(true);
      RNSecureKeyStore.get("contractor_id").then(async res => {
        await updatePassword(
          res,
          contractorPassword.oldPassword,
          contractorPassword.newPassword
        )
          .then(async () => {
            Alert.alert("Success");
            await contractorLogout();
            RNRestart.Restart();
          })
          .catch(err => {
            setLoadingIndocator(false);
            Alert.alert("Invalid old password");
            setContractorPassword({ ...contractorPassword, oldPassword: "" });
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
        navigation={props.navigation}
      />
      <View style={{ marginHorizontal: 20 }}>
        <Input
          placeholder="Old Password"
          label="Old Password"
          secureTextEntry
          value={contractorPassword.oldPassword}
          containerStyle={{ height: hp("4%"), marginVertical: 30 }}
          onChangeText={value =>
            setContractorPassword({ ...contractorPassword, oldPassword: value })
          }
        />
        <Input
          placeholder="New Password"
          label="New Password"
          secureTextEntry
          value={contractorPassword.newPassword}
          containerStyle={{ height: hp("4%"), marginVertical: 30 }}
          onChangeText={value =>
            setContractorPassword({ ...contractorPassword, newPassword: value })
          }
        />
        <Input
          placeholder="Confirm New Password"
          label="Confirm New Password"
          secureTextEntry
          value={contractorPassword.confirmPassword}
          containerStyle={{ height: hp("4%"), marginVertical: 30 }}
          onChangeText={value =>
            setContractorPassword({ ...contractorPassword, confirmPassword: value })
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
      </View>
      <DotIndicator color="black" animating={loadingIndicator} />
    </View>
  );
}

export default UpdatePassword;
