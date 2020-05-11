import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Header from "../Categories/Components/Header";
import moment from "moment";
import ImagePicker from "react-native-image-picker";
import RNSecureKeyStore from "react-native-secure-key-store";
import { apply } from "../../../Api/api";
import { DotIndicator } from "react-native-indicators";

const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

function Application3(props) {
  const [loadingIndicator, setLoadingIndocator] = useState(false);
  const [contractor, setContractor] = useState({
    firstname: props.navigation.getParam("contractor").firstname,
    lastname: props.navigation.getParam("contractor").lastname,
    category: props.navigation.getParam("contractor").category,
    location: props.navigation.getParam("contractor").location,
    timeIn: moment(props.navigation.getParam("contractor").timeIn).format(
      "hh:mm A"
    ),
    timeOut: moment(props.navigation.getParam("contractor").timeOut).format(
      "hh:mm A"
    ),
    identity: null,
    nonCriminal: null,
    profileImage: null
  });

  const selectImage = () => {
    ImagePicker.launchImageLibrary(options, response => {
      setContractor({ ...contractor, profileImage: response.uri });
    });
  };

  const selectNonCriminal = () => {
    ImagePicker.launchImageLibrary(options, response => {
      setContractor({ ...contractor, nonCriminal: response.uri });
    });
  };

  const selectIdentity = () => {
    ImagePicker.launchImageLibrary(options, response => {
      setContractor({ ...contractor, identity: response.uri });
    });
  };

  const handleSubmit = () => {
    if (
      !contractor.profileImage ||
      !contractor.nonCriminal ||
      !contractor.identity
    ) {
      alert("Please check all inputs");
    } else {
      setLoadingIndocator(true);
      RNSecureKeyStore.get("user_id").then(async res => {
        await apply(res, contractor)
          .then(res => {
            props.navigation.navigate("applicationSuccess");
          })
          .catch(err => setLoadingIndocator(false));
      });
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "white" }}
      pointerEvents={loadingIndicator ? "none" : "auto"}
    >
      <Header title="Contractor Assets" navigation={props.navigation} />
      <View style={{ alignItems: "center", marginVertical: hp("1%") }}>
        <Text style={{ marginVertical: hp("1%"), fontSize: 20 }}>
          Profile Image
        </Text>
        <TouchableOpacity onPress={() => selectImage()}>
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "black"
            }}
            source={{
              uri: contractor.profileImage
                ? contractor.profileImage
                : "https://static.thenounproject.com/png/3134331-200.png"
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => selectNonCriminal()}>
          <Text
            style={{
              marginHorizontal: wp("2%"),
              marginTop: hp("4%"),
              fontSize: 18
            }}
          >
            Upload Non-criminal Certificate
          </Text>
          {contractor.nonCriminal ? (
            <Text style={{ color: "green", marginHorizontal: wp("3%") }}>
              File Uploaded
            </Text>
          ) : (
            <Text style={{ color: "red", marginHorizontal: wp("3%") }}>
              Upload File
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectIdentity()}>
          <Text
            style={{
              marginHorizontal: wp("2%"),
              marginTop: hp("4%"),
              fontSize: 18
            }}
          >
            Upload ID or Passport
          </Text>
          {contractor.identity ? (
            <Text style={{ color: "green", marginHorizontal: wp("3%") }}>
              File Uploaded
            </Text>
          ) : (
            <Text style={{ color: "red", marginHorizontal: wp("3%") }}>
              Upload File
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={{
          backgroundColor: "black",
          height: hp("7%"),
          marginHorizontal: wp("3%"),
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: hp("10%")
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Submit Application
        </Text>
      </TouchableOpacity>
      <DotIndicator color="black" animating={loadingIndicator} />
    </View>
  );
}

export default Application3;
