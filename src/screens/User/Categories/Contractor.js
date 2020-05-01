import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Dimensions,
  RefreshControl,
  Image,
  ScrollView
} from "react-native";
import Header from "./Components/Header";
import { Divider } from "react-native-elements";
import * as Animated from "react-native-animatable";
import { getContractor, getContractorsReviews } from "../../../Api/api";
import { ListItem } from "react-native-elements";

const { width, height } = Dimensions.get("window");

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Contractor(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [contractor, setContractor] = useState({});
  const [contractorReviews, setContractorReview] = useState([]);
  const [contractorName] = useState(
    props.navigation.getParam("contractorName")
  );
  const [contractorId] = useState(props.navigation.getParam("contractorId"));

  useEffect(() => {
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchContractorsReviews();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header title={contractorName} navigation={props.navigation} />
      <View style={{ height: height / 4, backgroundColor: "#00ccff" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderColor: "white",
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
        </View>
      </View>
      <Animated.View animation="zoomIn" iterationCount={1} style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <Text style={{ fontSize: 15 }}>
            What people think about {contractorName}
          </Text>
        </View>
        <Divider style={{ backgroundColor: "black", marginHorizontal: 10 }} />
        {!contractorReviews ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: width,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{ width: 250, height: 250 }}
              source={require("../../../Assets/noreviews.jpg")}
            />
            <Text
              style={{
                fontSize: 15,
                marginHorizontal: 30,
                color: "grey",
                textAlign: "center"
              }}
            >
              {contractorName} dosn't have any reviews yet! Share one and let
              people know about you're experince with {contractorName}
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginHorizontal: 10, marginVertical: 10 }}
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
