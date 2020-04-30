import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { ListItem } from "react-native-elements";
import { fetchContractors } from "../../../Api/api";
import Header from "./Components/Header";
import * as Animated from "react-native-animatable";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Category(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [category] = useState(props.navigation.getParam("category"));
  const [contractors, setContractors] = useState(null);

  useEffect(() => {
    getContractors();
  }, [category]);

  const getContractors = async () => {
    await fetchContractors(category)
      .then(({ data }) => setContractors(data))
      .catch(err => console.log(err));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getContractors();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title={category} navigation={props.navigation} />
      <Animated.View animation="zoomIn" iterationCount={1}>
        <ScrollView
          style={{ marginHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {contractors &&
            contractors.map((elm, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => alert(elm.id)}>
                  <ListItem
                    title={elm.name}
                    subtitle={`${elm.location}, ${elm.timeIn} - ${elm.timeOut}`}
                    subtitleStyle={{ color: "grey" }}
                    bottomDivider
                    leftAvatar={{
                      source: {
                        uri: elm.profileImage
                          ? elm.profileImage
                          : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                      }
                    }}
                    chevron
                  />
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

export default Category;
