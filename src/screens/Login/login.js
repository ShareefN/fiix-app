import React, { Component } from "react";
import { SafeAreaView, View } from "react-native";
import { Image } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import Email from "./emailLogin";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <Animatable.View animation="zoomIn" iterationCount={1} style={{alignItems: 'center'}}>
          <Image
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
            }}
            style={{ width: 200, height: 200 }}
          />
        </Animatable.View>
        <Animatable.Text animation="zoomInUp">
          Login with email and password
        </Animatable.Text>
        {/* <Email /> */}
      </SafeAreaView>
    );
  }
}

export default Login;
