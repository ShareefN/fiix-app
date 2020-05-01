import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

function LeftComponent(props) {
  return (
    <>
      <TouchableOpacity
        onPress={() => props.nav.goBack()}
        style={{ alignItems: "center" }}
      >
        <Icon name="arrow-back" />
      </TouchableOpacity>
    </>
  );
}

export default LeftComponent;
