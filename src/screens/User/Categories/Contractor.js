import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  RefreshControl,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  Linking,
  Platform
} from "react-native";
import ContractorHeader from "./Components/contractorHeader";
import * as Animated from "react-native-animatable";
import {
  getContractor,
  getContractorsReviews,
  addContractorReview,
  deleteContractorReview
} from "../../../Api/api";
import { ListItem, Divider } from "react-native-elements";
import RNSecureKeyStore from "react-native-secure-key-store";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { FAB } from "react-native-paper";
import { DotIndicator } from "react-native-indicators";
import Adbanner from "../../../Admobs/Banners";
import AdLargeBanner from "../../../Admobs/LargeBanners";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Contractor(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [contractor, setContractor] = useState({});
  const [loadingIndicator, setLoadingIndocator] = useState(false);
  const [userId, setUserId] = useState(null);
  const [contractorReviews, setContractorReview] = useState([]);
  const [review, setReview] = useState("");
  const [contractorName] = useState(
    props.navigation.getParam("contractorName")
  );
  const [contractorId] = useState(props.navigation.getParam("contractorId"));

  useEffect(() => {
    RNSecureKeyStore.get("user_id")
      .then(res => setUserId(res))
      .catch(err => console.log(err));

    fetchContractor();
    fetchContractorsReviews();
  }, [contractorId]);

  const fetchContractor = async () => {
    setLoadingIndocator(true);
    await getContractor(contractorId)
      .then(({ data }) => {
        setLoadingIndocator(false);
        setContractor(data);
      })
      .catch(err => setLoadingIndocator(false));
  };

  const fetchContractorsReviews = async () => {
    await getContractorsReviews(contractorId)
      .then(({ data }) => {
        if (data && data.length === 0) {
          setLoadingIndocator(false);
          setContractorReview(null);
        } else {
          setLoadingIndocator(false);
          setContractorReview(data);
        }
      })
      .catch(err => setLoadingIndocator(false));
  };

  const postReview = () => {
    if (review.length <= 3) {
      Alert.alert("Review too short!");
    } else {
      setLoadingIndocator(true);
      RNSecureKeyStore.get("user_id").then(async res => {
        await addContractorReview(res, contractorId, review);
        fetchContractorsReviews();
        setReview("");
      });
    }
  };

  const deleteReview = reviewId => {
    setLoadingIndocator(true);
    RNSecureKeyStore.get("user_id").then(async res => {
      await deleteContractorReview(res, reviewId);
      fetchContractorsReviews();
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchContractorsReviews();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View
      style={{ flex: 1, backgroundColor: "white" }}
      pointerEvents={loadingIndicator ? "none" : "auto"}
    >
      <ContractorHeader contractor={contractor} navigation={props.navigation} />
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
          <Text style={{ fontSize: 15, marginVertical: hp("1%") }}>
            {contractor.bio}
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
        <View
          style={{
            marginVertical: 5,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TextInput
            placeholder={`Say something about ${contractorName}!`}
            style={styles.textInput}
            onChangeText={review => setReview(review)}
            value={review}
            placeholderTextColor="grey"
          />
          <FAB
            style={styles.fab}
            icon="plus"
            color="black"
            small
            onPress={() => postReview()}
          />
        </View>
        <Divider style={{ backgroundColor: "black", marginHorizontal: 25 }} />
        {!contractorReviews ? (
          <>
            <ScrollView
              style={{ marginBottom: 50 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
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
                  source={require("../../../Assets/noreviews.jpg")}
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginHorizontal: wp("2%"),
                    color: "grey",
                    textAlign: "center",
                    letterSpacing: 2
                  }}
                >
                  {contractorName} dosn't have any reviews yet!
                </Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {Platform.OS === "ios" ? (
                  <AdLargeBanner
                    id={"ca-app-pub-6510981239392097/1908185990"}
                  />
                ) : (
                  <AdLargeBanner
                    id={"ca-app-pub-6510981239392097/4845905175"}
                  />
                )}
              </View>
            </ScrollView>
          </>
        ) : (
          <>
            <View style={{ width: wp("50%") }}>
              {Platform.OS === "ios" ? (
                <Adbanner id={"ca-app-pub-6510981239392097/3053940223"} />
              ) : (
                <Adbanner id={"ca-app-pub-6510981239392097/3336354719"} />
              )}
            </View>
            <ScrollView
              style={{ marginBottom: 50 }}
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
          </>
        )}
        <DotIndicator color="black" animating={loadingIndicator} />
      </Animated.View>
      <FAB
        onPress={() => Linking.openURL(`tel:${contractor.number}`)}
        icon="phone"
        color="white"
        large
        style={{
          position: "absolute",
          margin: 16,
          backgroundColor: "black",
          right: 0,
          bottom: 0
        }}
      />
    </View>
  );
}

export default Contractor;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: hp("5%"),
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)"
  },
  fab: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    marginRight: 20
  }
});
