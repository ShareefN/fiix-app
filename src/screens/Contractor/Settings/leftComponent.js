import React from "react";
import { Icon } from "react-native-elements";

function LeftComponent(props) {
  return <Icon name="arrow-back" onPress={() => props.navigation.goBack()} />;
}

export default LeftComponent;
