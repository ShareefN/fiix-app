import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

function RightComponent(props) {
  return (
    <View>
      <TouchableOpacity onPress={() => alert("hii")}>
        <Icon name="help-outline" />
      </TouchableOpacity>
    </View>
  );
}

export default RightComponent;
