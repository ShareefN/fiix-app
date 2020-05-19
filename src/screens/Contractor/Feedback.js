import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Header from "./Settings/Header";
import { Input } from "react-native-elements";
import { postFeedback } from "../../Api/contractorApi";
import RNSecureKeyStore from "react-native-secure-key-store";
import Dialog from "react-native-dialog";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { DotIndicator } from "react-native-indicators";

function Feedback(props) {
  const [feedback, setFeedback] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loadingIndicator, setLoadingIndocator] = useState(false);

  const handleSubmit = () => {
    if (feedback.length <= 3) {
      Alert.alert("Feedback too short!");
    } else {
      RNSecureKeyStore.get("contractor_id").then(async res => {
        setLoadingIndocator(true);
        await postFeedback(res, feedback)
          .then(() => {
            setLoadingIndocator(false);
            setDialogVisible(true);
          })
          .catch(err => setLoadingIndocator(false));
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
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Your feedback is sent!</Dialog.Title>
        <Dialog.Description>
          The FiiX team appreciates your time in reaching out, rest assured that
          your matter is of great importance to us and we will be reaching out
          with the best possible soltion.
        </Dialog.Description>
        <Dialog.Button
          label="Close"
          onPress={() => {
            setDialogVisible(false), setFeedback("");
            props.navigation.navigate("contractorHome");
          }}
        />
      </Dialog.Container>
      <DotIndicator color="black" animating={loadingIndicator} />
    </View>
  );
}

export default Feedback;
