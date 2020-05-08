import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import Header from "../Categories/Components/Header";
import RNSecureKeyStore from "react-native-secure-key-store";
import { getUser } from "../../../Api/api";
import { Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

function ApplciationStatus(props) {
  const [user, setUser] = useState({
    applicationStatus: "",
    notes: ""
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
            applicationStatus: data.applicationStatus,
            notes: data.notes
          });
        })
        .catch(err => console.log(err));
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="Application Status" navigation={props.navigation} />
      <View style={{ flex: 1, alignItems: "center", marginVertical: hp("5%") }}>
        {user.applicationStatus === "applied" ? (
          <>
            <Icon name="beenhere" color="green" size={150} />
            <Text
              style={{
                marginVertical: hp("5%"),
                textAlign: "center",
                marginHorizontal: wp("3%")
              }}
            >
              Application is under proccessing, it might take from 24 - 48 hours
              to share your results
            </Text>
          </>
        ) : (
          <>
            <Icon name="backspace" color="red" size={150} />
            <Text
              style={{
                marginVertical: hp("5%"),
                textAlign: "center",
                marginHorizontal: wp("3%")
              }}
            >
              Your application has been rejected
            </Text>
            <Text
              style={{
                textAlign: "center",
                marginHorizontal: wp("5%"),
                fontSize: 20
              }}
            >
              <Text style={{ color: "red" }}>Reason:</Text> {user.notes}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                height: hp("7%"),
                width: wp("90%"),
                marginHorizontal: wp("3%"),
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: hp("10%")
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                Contact FiiX for revision
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

export default ApplciationStatus;
