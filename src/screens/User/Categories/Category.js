import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { ListItem } from "react-native-elements";
import { fetchContractors } from "../../../Api/api";
import Header from "./Components/Header";
import * as Animated from "react-native-animatable";
import RNSecureKeyStore from "react-native-secure-key-store";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { DotIndicator } from "react-native-indicators";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Category(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [username, setUsername] = useState(null);
  const [loadingIndicator, setLoadingIndocator] = useState(false);
  const [category] = useState(props.navigation.getParam("category"));
  const [contractors, setContractors] = useState(null);

  useEffect(() => {
    RNSecureKeyStore.get("username").then(res => {
      setUsername(res);
    });
    getContractors();
  }, [category]);

  const getContractors = async () => {
    setLoadingIndocator(true);
    await fetchContractors(category)
      .then(({ data }) => {
        if (data && data.length === 0) {
          setLoadingIndocator(false);
          setContractors(null);
        } else {
          setLoadingIndocator(false);
          setContractors(data);
        }
      })
      .catch(err => setLoadingIndocator(false));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getContractors();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title={category} navigation={props.navigation} />
      <Animated.View animation="zoomIn" iterationCount={1} style={{ flex: 1 }}>
        {!contractors ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{ width: wp("40%"), height: 150 }}
              source={require("../../../Assets/notfound.jpg")}
            />
            <Text
              style={{
                fontSize: 35,
                color: "orange",
                marginHorizontal: 25,
                marginVertical: hp("1%")
              }}
            >
              Hi {username}!
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginHorizontal: wp("5%"),
                color: "grey",
                textAlign: "center"
              }}
            >
              Unfortunately there's no contractors for this category yet! If you
              know someone that is intrested in making money with FiiX please
              let them know
            </Text>
          </View>
        ) : (
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
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      props.navigation.navigate("contractor", {
                        contractorId: elm.id,
                        contractorName: elm.name
                      })
                    }
                  >
                    <ListItem
                      title={`${elm.name}`}
                      subtitle={`${elm.location} \u2B16 ${elm.timeIn} - ${elm.timeOut}`}
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
        )}
        <DotIndicator color="black" animating={loadingIndicator} />
      </Animated.View>
    </View>
  );
}

export default Category;
