import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Header from "./Categories/Components/Header";
import { Input } from "react-native-elements";
import { postFeedback } from "../../Api/api";
import RNSecureKeyStore from "react-native-secure-key-store";
import Dialog from "react-native-dialog";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

function Feedback(props) {
  const [feedback, setFeedback] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleSubmit = () => {
    RNSecureKeyStore.get("user_id").then(async res => {
      if (feedback.length <= 3) {
        alert("Feedback too short!");
      } else {
        await postFeedback(res, feedback)
          .then(res => {
            setDialogVisible(true);
          })
          .catch(err => console.log(err));
      }
    });
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title="Feedback" navigation={props.navigation} />
      <View style={{ marginHorizontal: 20, marginVertical: hp("7%") }}>
        <Input
          placeholder="Whats Wrong?"
          label="Please let us know everything"
          multiline
          value={feedback}
          Î
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
            props.navigation.navigate("userHome");
          }}
        />
      </Dialog.Container>
    </View>
  );
}

export default Feedback;
