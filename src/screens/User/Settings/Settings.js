import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import Header from "../Categories/Components/Header";
import {
  getUser,
  updateUser,
  userDeactivateAccount,
  userLogout
} from "../../../Api/api";
import RNSecureKeyStore from "react-native-secure-key-store";
import { Input } from "react-native-elements";
import Dialog from "react-native-dialog";
import DialogInput from "react-native-dialog-input";
import Loading from "react-native-loading-spinner-overlay";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import RNRestart from "react-native-restart";

function Settings(props) {
  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    number: "",
    password: ""
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
            email: data.email,
            number: data.number
          });
        })
        .catch(err => console.log(err));
    });
  };

  const handleUpdateUser = () => {
    setLoading(true);
    RNSecureKeyStore.get("user_id").then(async res => {
      await updateUser(res, user)
        .then(res => {
          setLoading(false);
          setSuccessDialog(true);
        })
        .catch(err => setLoading(false));
    });
  };

  const handleDeactivateAccount = async () => {
    setLoading(true);
    RNSecureKeyStore.get("user_id").then(async res => {
      await userDeactivateAccount(res, user.password)
        .then(async res => {
          await userLogout();
          RNRestart.Restart();
        })
        .catch(err => {
          setLoading(false), Alert.alert("Invalid password");
        });
    });
  };

  return (
    <View
      style={{ backgroundColor: "white", flex: 1 }}
      pointerEvents={loading ? "none" : "auto"}
    >
      <Header title="Settings" value="settings" navigation={props.navigation} />
      <View
        style={{
          alignItems: "flex-end",
          marginHorizontal: 25
        }}
      >
        <TouchableOpacity
          onPress={() => handleUpdateUser()}
          style={{
            backgroundColor: "green",
            height: hp("4%"),
            width: wp("25%"),
            borderRadius: 5,
            marginTop: hp("2%"),
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 20, flex: 1 }}>
        <Input
          placeholder="Username"
          label="Username"
          value={user.username}
          containerStyle={{ height: hp("4%"), marginVertical: 25 }}
          onChangeText={value => setUser({ ...user, username: value })}
        />
        <Input
          placeholder="Email"
          label="Email"
          value={user.email}
          containerStyle={{ height: hp("4%"), marginVertical: 25 }}
          onChangeText={value => setUser({ ...user, email: value })}
        />
        <Input
          placeholder="Number"
          label="Number"
          maxLength={10}
          keyboardType="numeric"
          value={user.number}
          containerStyle={{ height: hp("4%"), marginVertical: 25 }}
          onChangeText={value => setUser({ ...user, number: value })}
        />
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("updatePassword")}
        style={{
          backgroundColor: "black",
          height: hp("7%"),
          marginHorizontal: wp("3%"),
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 15
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Change Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setDialogVisible(true)}
        style={{
          backgroundColor: "red",
          height: hp("7%"),
          marginHorizontal: wp("3%"),
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 15
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Deactivate account
        </Text>
      </TouchableOpacity>
      <DialogInput
        isDialogVisible={dialogVisible}
        title={"Deactivate Account"}
        message={
          "Please confirm by entering password"
        }
        submitInput={inputText => {
          setUser({ ...user, password: inputText });
          handleDeactivateAccount();
        }}
        closeDialog={() => {
          setDialogVisible(false);
        }}
      ></DialogInput>
      <Dialog.Container visible={successDialog}>
        <Dialog.Title>Success</Dialog.Title>
        <Dialog.Description>
          User have been successfully updated
        </Dialog.Description>
        <Dialog.Button label="close" onPress={() => setSuccessDialog(false)} />
      </Dialog.Container>
      <Loading visible={loading} color="black" size="large" />
    </View>
  );
}

export default Settings;
