import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import Email from "./emailLogin";

 class Login extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <Text>from parent</Text>
        <Email />
      </SafeAreaView>
    );
  }
}

export default Login;