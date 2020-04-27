import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

function AddFab(props) {
  return (
    <FAB
      style={styles.fab}
      icon="plus"
      small
      onPress={() => props.navigation.navigate("addReview")}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "black",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default AddFab;
