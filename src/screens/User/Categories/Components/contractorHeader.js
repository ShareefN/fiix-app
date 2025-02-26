import React from "react";
import { Header } from "react-native-elements";
import LeftComponent from "./LeftComponent";
import RightComponent from './RightComponent';

function ContractorHeader(props) {

  return (
    <Header
      backgroundColor="white"
      leftComponent={<LeftComponent nav={props.navigation} />}
      centerComponent={{
        text: props.contractor.name,
        style: { color: "black", fontSize: 20 }
      }}
      // rightComponent={<RightComponent post={props.post} contractor={props.contractor}/>}
    />
  );
}

export default ContractorHeader;
