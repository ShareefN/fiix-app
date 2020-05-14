import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, ScrollView, RefreshControl } from "react-native";
import { getContractor, getContractorReviews } from "../../Api/contractorApi";
import RNSecureKeyStore from "react-native-secure-key-store";
import moment from "moment";
import Header from "./Components/Header";
import { Divider, ListItem } from "react-native-elements";
import * as Animated from "react-native-animatable";
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

function ContractorHome(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [contractor, setContractor] = useState({
    name: null,
    bio: null,
    joinedAt: null,
    location: null,
    profileImage: null,
    timeIn: null,
    timeOut: null
  });
  const [reviews, setReviews] = useState(null);
  const [contractorId, setContractorId] = useState(null);
  const [loadingIndicator, setLoadingIndocator] = useState(false);

  useEffect(() => {
    setLoadingIndocator(true)
    RNSecureKeyStore.get("contractor_id").then(async res => {
      fetchContractor(res);
      fetchContractorReviews(res);
      setContractorId(res);
    });
  }, []);

  const fetchContractor = async id => {
    await getContractor(id)
      .then(({ data }) => {
        setContractor({
          ...contractor,
          name: data.name,
          bio: data.bio,
          joinedAt: moment(data.createdAt).format("MMMM-D-YYYY"),
          location: data.location,
          profileImage: data.profileImage,
          timeIn: data.timeIn,
          timeOut: data.timeOut
        });
        setLoadingIndocator(false)
      })
      .catch(err => setLoadingIndocator(false));
  };

  const fetchContractorReviews = async id => {
    await getContractorReviews(id)
      .then(({ data }) => {
        setReviews(data);
        setLoadingIndocator(false)
      })
      .catch(err => setLoadingIndocator(false));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchContractor(contractorId);
    fetchContractorReviews(contractorId);
    wait(2000).then(() => setRefreshing(false));
  }, [reviews]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="My Profile" navigation={props.navigation}/>
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
          {contractor.name} {"\u2B25"} {contractor.location}
        </Text>
        <Text style={{ fontSize: 15, marginVertical: hp("1%") }}>Bio....</Text>
        <Text style={{ fontSize: 10 }}>Joined {contractor.joinedAt}</Text>
      </View>
      <Divider style={{ backgroundColor: "black", marginHorizontal: 10 }} />
      <Animated.View animation="zoomIn" iterationCount={1} style={{ flex: 1 }}>
        {reviews && reviews ? (
          <ScrollView
            style={{ marginBottom: 50, marginHorizontal: 25 }}
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
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: hp("3%"),
              marginHorizontal: wp("10%")
            }}
          >
            <Image
              style={{ width: wp("30%"), height: 100 }}
              source={require("../../Assets/noreviews.jpg")}
            />
            <Text
              style={{
                fontSize: 15,
                marginHorizontal: wp("2%"),
                color: "grey",
                textAlign: "center"
              }}
            >
              You dont have any reviews yet!
            </Text>
          </View>
        )}
        <DotIndicator color="black" animating={loadingIndicator} />
      </Animated.View>
    </View>
  );
}

export default ContractorHome;
