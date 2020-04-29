import React from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import { deleteReview } from "../../../Api/api";

function ReviewsList(props) {
  const removeReview = async reviewId => {
    await deleteReview(reviewId);
    await props.refresh();
  };

  return (
    <View style={{ marginHorizontal: 10, marginBottom: 50 }}>
      {props.list &&
        props.list.map((elm, index) => {
          if (elm.userId.toString() === props.userId.toString()) {
            return (
              <ListItem
                key={index}
                title={elm.username}
                titleStyle={{ fontWeight: "bold" }}
                subtitleStyle={{ marginTop: 10, color: "black" }}
                subtitle={elm.review}
                bottomDivider
                rightIcon={{
                  name: "delete",
                  color: "grey",
                  onPress: () => {
                    removeReview(elm.id);
                  }
                }}
              />
            );
          } else {
            return (
              <ListItem
                key={index}
                title={elm.username}
                titleStyle={{ fontWeight: "bold" }}
                subtitleStyle={{ marginTop: 10, color: "black" }}
                subtitle={elm.review}
                bottomDivider
              />
            );
          }
        })}
    </View>
  );
}

export default ReviewsList;
