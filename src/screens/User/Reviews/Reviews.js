import React, { useEffect, useState, useCallback } from "react";
import {
  TextInput,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Alert,
  Text,
  Image,
  Platform
} from "react-native";
import Header from "../Components/HeaderComponent";
import { Divider, ListItem } from "react-native-elements";
import { getReviews, deleteReview, postReview } from "../../../Api/api";
import RNSecureKeyStore from "react-native-secure-key-store";
import * as Animated from "react-native-animatable";
import { FAB } from "react-native-paper";
import { DotIndicator } from "react-native-indicators";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Adbanner from "../../../Admobs/Banners";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Reviews(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingIndicator, setLoadingIndocator] = useState(false);
  const [userId, setUserId] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [review, setReview] = useState("");

  useEffect(() => {
    RNSecureKeyStore.get("user_id").then(res => {
      setUserId(res);
    });

    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoadingIndocator(true);
    await getReviews()
      .then(({ data }) => {
        setReviews(data);
        setRefreshing(false);
        setLoadingIndocator(false);
      })
      .catch(err => console.log(err));
  };

  const submitReview = async () => {
    if (review.length <= 3) {
      Alert.alert("Review too short");
    } else {
      setLoadingIndocator(true);
      await postReview(userId, review);
      fetchReviews();
      setReview("");
    }
  };

  const removeReview = async reviewId => {
    setLoadingIndocator(true);
    await deleteReview(userId, reviewId);
    fetchReviews();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchReviews();
    wait(2000);
  }, [refreshing]);

  return (
    <View
      style={{ backgroundColor: "white", flex: 1 }}
      pointerEvents={loadingIndicator ? "none" : "auto"}
    >
      <Header title="Reviews" value="reviews" />
      <View
        style={{
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <TextInput
          placeholder="Whats on your mind?"
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
          onPress={() => submitReview()}
        />
      </View>
      <View style={{ width: wp("50%") }}>
        {Platform.OS === "ios" ? (
          <Adbanner id={"ca-app-pub-6510981239392097/3109780549"} />
        ) : (
          <Adbanner id={"ca-app-pub-6510981239392097/7286922608"} />
        )}
      </View>
      <Divider style={{ backgroundColor: "black", marginHorizontal: 10 }} />
      <Animated.View animation="zoomIn" iterationCount={1} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {reviews && reviews.length >= 1 ? (
            <View style={{ marginHorizontal: 10, marginBottom: 50 }}>
              {reviews &&
                reviews.map((elm, index) => {
                  return (
                    <ListItem
                      key={index}
                      title={elm.username}
                      titleStyle={{ fontWeight: "bold" }}
                      subtitleStyle={{ marginTop: 10, color: "black" }}
                      subtitle={elm.review}
                      bottomDivider
                      rightIcon={{
                        name:
                          elm.userId.toString() === userId ? "delete" : null,
                        color: "grey",
                        onPress: () => {
                          removeReview(elm.id);
                        }
                      }}
                    />
                  );
                })}
            </View>
          ) : (
            <>
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
                  No reviews so far!
                </Text>
              </View>
            </>
          )}
        </ScrollView>
        <DotIndicator color="black" animating={loadingIndicator} />
      </Animated.View>
    </View>
  );
}

export default Reviews;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 50,
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
