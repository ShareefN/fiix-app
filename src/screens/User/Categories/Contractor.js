import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Dimensions,
  RefreshControl,
  Image,
  ScrollView
} from "react-native";
import ContractorHeader from "./Components/contractorHeader";
import { Divider } from "react-native-elements";
import * as Animated from "react-native-animatable";
import {
  getContractor,
  getContractorsReviews,
  addContractorReview,
  deleteContractorReview
} from "../../../Api/api";
import { ListItem } from "react-native-elements";
import RNSecureKeyStore from "react-native-secure-key-store";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Contractor(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [contractor, setContractor] = useState({});
  const [userId, setUserId] = useState(null);
  const [contractorReviews, setContractorReview] = useState([]);
  const [contractorName] = useState(
    props.navigation.getParam("contractorName")
  );
  const [contractorId] = useState(props.navigation.getParam("contractorId"));

  useEffect(() => {
    RNSecureKeyStore.get("user_id")
      .then(res => setUserId(res))
      .catch(err => console.timeLog(err));

    fetchContractor();
    fetchContractorsReviews();
  }, [contractorId]);

  const fetchContractor = async () => {
    await getContractor(contractorId)
      .then(({ data }) => setContractor(data))
      .catch(err => console.log(err));
  };

  const fetchContractorsReviews = async () => {
    await getContractorsReviews(contractorId)
      .then(({ data }) => {
        if (data && data.length === 0) {
          setContractorReview(null);
        } else {
          setContractorReview(data);
        }
      })
      .catch(err => console.log(err));
  };

  const postReview = async review => {
    if (review.length <= 3) {
      alert("Review too short!");
    } else {
      await addContractorReview(contractorId, review);
      fetchContractorsReviews();
    }
  };

  const deleteReview = async reviewId => {
    await deleteContractorReview(reviewId);
    await onRefresh();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchContractorsReviews();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ContractorHeader
        contractor={contractor}
        navigation={props.navigation}
        post={postReview}
      />
      <View style={{ backgroundColor: "white" }}>
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
          <Text style={{ fontSize: 15 }}>
            {contractor.timeIn} - {contractor.timeOut}
          </Text>
          <Text style={{ fontSize: 10 }}>
            Joined {moment(contractor.createdAt).format("MMM-D-YYYY")}
          </Text>
        </View>
      </View>
      <Animated.View animation="zoomIn" iterationCount={1} style={{ flex: 1 }}>
        <View style={{ marginHorizontal: wp("2%"), marginVertical: 10 }}>
          <Text style={{ fontSize: 15 }}>
            What people think about {contractorName}
          </Text>
        </View>
        <Divider style={{ backgroundColor: "black", marginHorizontal: 25 }} />
        {!contractorReviews ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: width,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{ width: wp("30%"), height: 100 }}
              source={require("../../../Assets/noreviews.jpg")}
            />
            <Text
              style={{
                fontSize: 15,
                marginHorizontal: wp('2%'),
                color: "grey",
                textAlign: "center"
              }}
            >
              {contractorName} dosn't have any reviews yet! Share one and let
              people know about your experince with {contractorName}
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {contractorReviews &&
              contractorReviews.map((elm, index) => {
                return (
                  <ListItem
                    key={index}
                    title={elm.username}
                    titleStyle={{ fontWeight: "bold" }}
                    subtitleStyle={{ marginTop: 5, color: "black" }}
                    subtitle={elm.review}
                    bottomDivider
                    rightIcon={{
                      name:
                        elm.userId.toString() === userId.toString()
                          ? "delete"
                          : null,
                      color: "grey",
                      onPress: () => {
                        deleteReview(elm.id);
                      }
                    }}
                  />
                );
              })}
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
}

export default Contractor;
