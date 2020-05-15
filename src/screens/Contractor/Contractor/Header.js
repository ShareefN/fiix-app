import React from "react";
import { Header } from "react-native-elements";
import LeftComponent from "./LeftComponent";

function ContractorHeader(props) {
  return (
    <Header
      leftComponent={<LeftComponent navigation={props.navigation} />}
      backgroundColor="white"
      centerComponent={{
        text: props.title,
        style: { color: "black", fontSize: 20 }
      }}
    />
  );
}

export default ContractorHeader;
