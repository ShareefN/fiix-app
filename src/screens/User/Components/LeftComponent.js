import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

function LeftComponent(props) {
  return (
    <View>
      <TouchableOpacity onPress={() => alert("hii")}>
        <Icon name="menu" />
      </TouchableOpacity>
    </View>
  );
}

export default LeftComponent;
