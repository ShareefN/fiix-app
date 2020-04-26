import React from "react";
import { Header } from "react-native-elements";
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";

function HeaderComponent(props) {
  return (
    <Header
      backgroundColor="white"
      leftComponent={<LeftComponent />}
      centerComponent={{
        text: props.title,
        style: { color: "black", fontSize: 30 }
      }}
      rightComponent={<RightComponent />}
    />
  );
}

export default HeaderComponent;
