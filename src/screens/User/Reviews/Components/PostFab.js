import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { postReview } from "../../../../Api/api";

function PostReview(props) {

  const submitReview = async () => {
    if (props.review.length <= 3) {
      alert("Review too short");
    } else {
      await postReview(props.review);
      props.navigation.goBack();
    }
  };

  return <FAB style={styles.fab} icon="send" onPress={() => submitReview()} />;
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "green",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default PostReview;
