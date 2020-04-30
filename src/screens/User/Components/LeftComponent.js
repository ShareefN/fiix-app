import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

function LeftComponent(props) {
  return (
    <>
      <TouchableOpacity onPress={() => alert("hii")}>
        <Icon name="menu" />
      </TouchableOpacity>
    </>
  );
}

export default LeftComponent;
