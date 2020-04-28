import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import PostReview from "../Components/PostFab";

function AddReview(props) {
  const [review, setReview] = useState("");
  return (
    <>
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Text style={{ fontSize: 20 }}>
          Tell others what you think about FiiX
        </Text>
      </View>
      <Divider style={{ backgroundColor: "black", marginHorizontal: 10 }} />
      <View style={{ marginVertical: 25 }}>
        <TextInput
          placeholder="Review"
          style={styles.textInput}
          onChangeText={review => setReview({ review })}
          placeholderTextColor="grey"
        />
      </View>
      <PostReview
        review={review}
        navigation={props.navigation}
      />
    </>
  );
}

export default AddReview;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)"
  }
});
