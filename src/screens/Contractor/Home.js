import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { contractorLogout } from "../../Api/api";
import RNRestart from "react-native-restart";

function ContractorHome(props) {
  const hanldeLogout = async () => {
    await contractorLogout();
    RNRestart.Restart();
  };

  return (
    <SafeAreaView>
      <Text>Contractor Home</Text>
      <TouchableOpacity onPress={() => hanldeLogout()}>
        <Text>logout </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ContractorHome;
