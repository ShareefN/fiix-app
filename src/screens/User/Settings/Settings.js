import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
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
import Loading from "react-native-loading-spinner-overlay";

function Settings(props) {
  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false)
  const [dialogVisible, setDialogVisible] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    number: ""
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
          setSuccessDialog(true)
        })
        .catch(err => setLoading(false));
    });
  };

  const handleDeactivateAccount = async () => {
    setLoading(true);
    RNSecureKeyStore.get("user_id").then(async res => {
      await userDeactivateAccount(res)
        .then(async res => {
          await userLogout()
            .then(res => {
              setDialogVisible(false);
              setLoading(false);
              props.navigation.navigate("userLogin");
            })
            .catch(err => setLoading(false));
        })
        .catch(err => setLoading(false));
    });
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title="Settings" value="settings" navigation={props.navigation} />
      <View
        style={{
          alignItems: "flex-end",
          marginHorizontal: 25,
          marginVertical: 20
        }}
      >
        <TouchableOpacity
          onPress={() => handleUpdateUser()}
          style={{
            backgroundColor: "green",
            height: 25,
            width: 100,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Input
          placeholder="Username"
          label="Username"
          value={user.username}
          containerStyle={{ marginVertical: 20 }}
          onChangeText={value => setUser({ ...user, username: value })}
        />
        <Input
          placeholder="Email"
          label="Email"
          value={user.email}
          containerStyle={{ marginVertical: 20 }}
          onChangeText={value => setUser({ ...user, email: value })}
        />
        <Input
          placeholder="Number"
          label="Number"
          maxLength={10}
          keyboardType="numeric"
          value={user.number}
          containerStyle={{ marginVertical: 20 }}
          onChangeText={value => setUser({ ...user, number: value })}
        />
      </View>
      <TouchableOpacity
      onPress={() => props.navigation.navigate('updatePassword')}
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
          Change Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setDialogVisible(true)}
        style={{
          backgroundColor: "red",
          height: 50,
          marginHorizontal: 20,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Deactivate account
        </Text>
      </TouchableOpacity>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Deactivate Account</Dialog.Title>
        <Dialog.Description>
          By confirming your account will be deactivated and you can no longer
          login unless you contact FiiX support
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button
          label="Deactivate"
          color="red"
          onPress={() => handleDeactivateAccount()}
        />
      </Dialog.Container>
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
