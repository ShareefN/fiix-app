import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

function LeftContractorComponent(props) {
  return (
    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
      <Icon name="menu" />
    </TouchableOpacity>
  );
}

export default LeftContractorComponent;
