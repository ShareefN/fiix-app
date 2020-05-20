import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Header from "./Settings/Header";
import { Input } from "react-native-elements";
import { postFeedback } from "../../Api/contractorApi";
import RNSecureKeyStore from "react-native-secure-key-store";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { DotIndicator } from "react-native-indicators";

function Feedback(props) {
  const [feedback, setFeedback] = useState("");
  const [loadingIndicator, setLoadingIndocator] = useState(false);

  const handleSubmit = () => {
    if (feedback.length <= 3) {
      Alert.alert("Feedback too short!");
    } else {
      RNSecureKeyStore.get("contractor_id").then(async res => {
        setLoadingIndocator(true);
        await postFeedback(res, feedback)
          .then(() => {
            Alert.alert(
              "Success!",
              "Thanks for reaching out",
              [
                {
                  text: "Ok",
                  onPress: () => {
                    setLoadingIndocator(false),
                      props.navigation.navigate("contractorHome");
                  }
                }
              ],
              { cancelable: false }
            );
          })
          .catch(err =>
            Alert.alert(
              "Error sending feeback",
              "Please try again later.",
              [
                {
                  text: "Ok",
                  onPress: () => {
                    setLoadingIndocator(false);
                  }
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
      pointerEvents={loadingIndicator ? "none" : "auto"}
    >
      <Header title="Feedback" navigation={props.navigation} />
      <View style={{ marginHorizontal: 20, marginVertical: hp("7%") }}>
        <Input
          placeholder="Whats Wrong?"
          label="Please let us know everything"
          multiline
          value={feedback}
          onChangeText={value => setFeedback(value)}
        />
        <TouchableOpacity
          onPress={() => handleSubmit()}
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
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <DotIndicator color="black" animating={loadingIndicator} />
    </View>
  );
}

export default Feedback;
