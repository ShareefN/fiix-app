import React from "react";
import { Header } from "react-native-elements";
import LeftComponent from "./LeftComponent";

function CategoryHeader(props) {
  return (
    <Header
      backgroundColor="white"
      leftComponent={<LeftComponent nav={props.navigation} />}
      centerComponent={{
        text: props.title,
        style: { color: "black", fontSize: 30 }
      }}
    />
  );
}

export default CategoryHeader;
