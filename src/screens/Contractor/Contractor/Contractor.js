import React, { useEffect, useState, useCallback } from "react";
import { View, ScrollView, Text, Image, RefreshControl, Platform } from "react-native";
import Header from "./Header";
import {
  getCompetitor,
  getContractorReviews
} from "../../../Api/contractorApi";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Divider, ListItem } from "react-native-elements";
import * as Animated from "react-native-animatable";
import { DotIndicator } from "react-native-indicators";
import AdBanner from "../../../Admobs/Banners";
import AdLargeBanner from "../../../Admobs/LargeBanners";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Contractor(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [competitor, setCompetitor] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [loadingIndicator, setLoadingIndocator] = useState(false);

  useEffect(() => {
    setLoadingIndocator(true);
    contractor();
    getReviews();
  }, [props.navigation.getParam("contractorId")]);

  const contractor = async () => {
    const id = props.navigation.getParam("contractorId");
    await getCompetitor(id).then(({ data }) => {
      setCompetitor(data);
      setLoadingIndocator(false);
    });
  };

  const getReviews = async () => {
    const id = props.navigation.getParam("contractorId");
    await getContractorReviews(id).then(({ data }) => {
      setReviews(data);
      setLoadingIndocator(false);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getReviews();
    wait(2000).then(() => setRefreshing(false));
  }, [reviews]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        title={props.navigation.getParam("contractorName")}
        navigation={props.navigation}
      />
      <View
        style={{
          marginVertical: hp("2%"),
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderColor: "black",
            borderWidth: 3
          }}
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
          }}
        />
        <Text style={{ marginTop: 10, fontSize: 20 }}>
          {competitor && competitor.name} {"\u2B25"}{" "}
          {competitor && competitor.location}
        </Text>
        <Text style={{ fontSize: 15, marginVertical: hp("1%") }}>
          {competitor && competitor.bio}
        </Text>
      </View>
      <AdBanner id={"ca-app-pub-6510981239392097/4537933354"} />

      <Divider style={{ backgroundColor: "grey", marginHorizontal: 10 }} />
      <Animated.View animation="zoomIn" iterationCount={1} style={{ flex: 1 }}>
        {reviews && reviews.length >= 1 ? (
          <ScrollView
            style={{ marginHorizontal: 25 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {reviews &&
              reviews.map((elm, index) => {
                return (
                  <ListItem
                    key={index}
                    title={elm.username}
                    titleStyle={{ fontWeight: "bold" }}
                    subtitleStyle={{ marginTop: 5, color: "black" }}
                    subtitle={elm.review}
                    bottomDivider
                  />
                );
              })}
          </ScrollView>
        ) : (
          <ScrollView
            style={{
              marginVertical: hp("3%"),
              marginHorizontal: wp("10%")
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={{ width: wp("30%"), height: 100 }}
                source={require("../../../Assets/noreviews.jpg")}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginHorizontal: wp("2%"),
                  color: "grey",
                  textAlign: "center"
                }}
              >
                {props.navigation.getParam("contractorName")} dosn't have any
                reviews yet!
              </Text>
              <View style={{ marginTop: 40 }}>
                <AdLargeBanner id={"ca-app-pub-6510981239392097/1908185990"} />
              </View>
            </View>
          </ScrollView>
        )}
        <DotIndicator color="black" animating={loadingIndicator} />
      </Animated.View>
    </View>
  );
}

export default Contractor;
