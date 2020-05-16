import React from "react";
import { Header } from "react-native-elements";
import LeftComponent from "./leftComponent";

function SettingsHeader(props) {
  return (
    <Header
      backgroundColor="white"
      leftComponent={<LeftComponent navigation={props.navigation} />}
      centerComponent={{
        text: props.title,
        style: { color: "black", fontSize: 25 }
      }}
    />
  );
}

export default SettingsHeader;
