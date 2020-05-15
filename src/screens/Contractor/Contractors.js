import React, { useEffect, useState, useCallback } from "react";
import { View, ScrollView, RefreshControl, Text, Image } from "react-native";
import Header from "./Components/Header";
import { getContractors } from "../../Api/contractorApi";
import RNSecureKeyStore from "react-native-secure-key-store";
import { Divider, ListItem } from "react-native-elements";
import * as Animated from "react-native-animatable";
import { DotIndicator } from "react-native-indicators";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function CategoryContractors(props) {
  const [category, setCategory] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [contractorsList, setContractorsList] = useState(null);
  const [loadingIndicator, setLoadingIndocator] = useState(false);

  useEffect(() => {
    RNSecureKeyStore.get("category").then(res => {
      setCategory(res);
    });

    RNSecureKeyStore.get("contractor_id").then(res => {
      contractors(res);
    });
  }, []);

  const contractors = async id => {
    setLoadingIndocator(true);
    await getContractors(category, id)
      .then(({ data }) => {
        if (!data) {
          setContractorsList(null);
          setLoadingIndocator(false);
        } else {
          setContractorsList(data);
          setLoadingIndocator(false);
        }
      })
      .catch(err => setLoadingIndocator(false));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    RNSecureKeyStore.get("contractor_id").then(res => {
      contractors(res);
    });
    wait(2000).then(() => setRefreshing(false));
  }, [contractorsList]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header title={category && category} />
      <Animated.View animation="zoomIn" iterationCount={1} style={{ flex: 1 }}>
        {contractorsList && contractorsList.length >= 1 ? (
          <ScrollView
            style={{ marginBottom: 50, marginHorizontal: 25 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {contractorsList &&
              contractorsList.map((elm, index) => {
                return (
                  <ListItem
                    onPress={() =>
                      props.navigation.navigate("contractor", {
                        contractorId: elm.id,
                        contractorName: elm.name
                      })
                    }
                    leftAvatar={{
                      source: {
                        uri: elm.profileImage
                          ? elm.profileImage
                          : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                      }
                    }}
                    key={index}
                    title={elm.name}
                    titleStyle={{ fontWeight: "bold" }}
                    subtitleStyle={{ marginTop: 5, color: "grey" }}
                    subtitle={`${elm.location} \u2B16 ${elm.timeIn} - ${elm.timeOut}`}
                    bottomDivider
                    chevron
                  />
                );
              })}
          </ScrollView>
        ) : (
          <ScrollView
            style={{ marginBottom: 50, marginHorizontal: 25 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={{ width: wp("30%"), height: 100 }}
                source={require("../../Assets/notfound.jpg")}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginHorizontal: wp("2%"),
                  color: "grey",
                  textAlign: "center"
                }}
              >
                Your the only contractor for this category
              </Text>
            </View>
          </ScrollView>
        )}

        <DotIndicator color="black" animating={loadingIndicator} />
      </Animated.View>
    </View>
  );
}

export default CategoryContractors;
