import React, { useState } from "react";
import { View, TouchableOpacity, Text, Alert, Platform } from "react-native";
import RNSecureKeyStore from "react-native-secure-key-store";
import Loading from "react-native-loading-spinner-overlay";
import { Input } from "react-native-elements";
import Header from "../Categories/Components/Header";
import { userDeactivateAccount, userLogout } from "../../../Api/api";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import RNRestart from "react-native-restart";
import AdLargeBanner from "../../../Admobs/LargeBanners";

function DeactivateAccount(props) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);

  const handleDeactivateAccount = async () => {
    if (password) {
      setLoading(true);
      RNSecureKeyStore.get("user_id").then(async res => {
        await userDeactivateAccount(res, password)
          .then(async () => {
            await userLogout();
            RNRestart.Restart();
          })
          .catch(err => {
            Alert.alert(
              "Error Deactivating Account",
              "Invalid password",
              [
                {
                  text: "Ok",
                  onPress: () => setLoading(false)
                }
              ],
              { cancelable: false }
            );
          });
      });
    } else {
      Alert.alert("Please enter your password");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }} pointerEvents={loading ? "none" : "auto"}>
      <Header title="Deactivate" navigation={props.navigation} />
      <Text style={{ margin: 20, letterSpacing: 2, fontSize: 20 }}>
        Were sad to see you go!
      </Text>
      <Input
        placeholder="Deactivate account by confirming password"
        label="Password"
        autoCapitalize={false}
        secureTextEntry
        containerStyle={{ height: hp("4%"), marginVertical: 25 }}
        onChangeText={value => setPassword(value)}
      />
      <TouchableOpacity
        onPress={() => handleDeactivateAccount()}
        style={{
          backgroundColor: "red",
          height: hp("7%"),
          marginHorizontal: wp("20%"),
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 30
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Deactivate
        </Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {Platform.OS === "ios" ? (
          <AdLargeBanner id={"ca-app-pub-6510981239392097/1908185990"} />
        ) : (
          <AdLargeBanner id={"ca-app-pub-6510981239392097/9056612925"} />
        )}
      </View>
      <Loading visible={loading} color="black" size="large" />
    </View>
  );
}

export default DeactivateAccount;
