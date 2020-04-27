import React from "react";
import { View } from "react-native";
import { ListItem, Icon } from "react-native-elements";

function ReviewsList(props) {
  return (
    <>
      <View style={{ marginHorizontal: 10, marginBottom: 50 }}>
        {props.list &&
          props.list.map((elm, index) => {
            return (
              <ListItem
                key={index}
                title={elm.username}
                titleStyle={{ fontWeight: "bold" }}
                subtitleStyle={{ marginTop: 10, color: "black" }}
                subtitle={elm.review}
                bottomDivider
                // rightIcon={() => <Icon name="delete" />}
              />
            );
          })}
      </View>
    </>
  );
}

export default ReviewsList;
