import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert, Platform } from "react-native";
import Header from "../Categories/Components/Header";
import {
  getUser,
  updateUser
} from "../../../Api/api";
import RNSecureKeyStore from "react-native-secure-key-store";
import { Input } from "react-native-elements";
import Dialog from "react-native-dialog";
import Loading from "react-native-loading-spinner-overlay";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AdLargeBanner from "../../../Admobs/LargeBanners";

function Settings(props) {
  const [loading, setLoading] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    number: "",
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
    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.test(user.email)) {
      Alert.alert("Invalid Email");
    } else if (user.number.length !== 10) {
      Alert.alert("Invalid Mobile Number");
    } else {
      setLoading(true);
      RNSecureKeyStore.get("user_id").then(async res => {
        await updateUser(res, user)
          .then(res => {
            setLoading(false);
            setSuccessDialog(true);
          })
          .catch(err =>
            Alert.alert(
              "Error Updating Profile",
              "Please try again later!",
              [
                {
                  text: "Ok",
                  onPress: () => setLoading(false)
                }
              ],
              { cancelable: false }
            )
          );
      });
    }
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
          autoCapitalize={false}
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
          containerStyle={{ height: hp("4%"), marginTop: 25 }}
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
        onPress={() => props.navigation.navigate('deactivate')}
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
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {Platform.OS === "ios" ? (
          <AdLargeBanner id={"ca-app-pub-6510981239392097/1908185990"} />
        ) : (
          <AdLargeBanner id={"ca-app-pub-6510981239392097/9056612925"} />
        )}
      </View>
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
