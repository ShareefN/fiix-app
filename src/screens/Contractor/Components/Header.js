import React from "react";
import { Header } from "react-native-elements";
import LeftComponent from "./leftComponent";

function ContractorHeader(props) {
  return (
    <Header
      leftComponent={
        props.title === "My Profile" ? (
          <LeftComponent navigation={props.navigation} />
        ) : null
      }
      backgroundColor="white"
      centerComponent={{
        text: props.title,
        style: { color: "black", fontSize: 20 }
      }}
    />
  );
}

export default ContractorHeader;
