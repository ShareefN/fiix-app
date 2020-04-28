import React, { useEffect, useState, useCallback } from "react";
import { Text, View, ScrollView, RefreshControl } from "react-native";
import Header from "../Components/HeaderComponent";
import { Divider } from "react-native-elements";
import { getReviews } from "../../../Api/api";
import ReviewsList from "./reviewsList";
import RNSecureKeyStore from "react-native-secure-key-store";
import AddReview from "./Components/AddFab";
import * as Animated from "react-native-animatable";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Reviews(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    RNSecureKeyStore.get("user_id").then(res => {
      setUserId(res);
    });

    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    await getReviews()
      .then(({ data }) => {
        setReviews(data);
      })
      .catch(err => console.log(err));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchReviews();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title="Reviews" value='reviews'/>
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Text style={{ fontSize: 20 }}>What people say about FiiX</Text>
      </View>
      <Divider style={{ backgroundColor: "black", marginHorizontal: 10 }} />
      <Animated.View animation="zoomIn" iterationCount={1} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ReviewsList
            list={reviews && reviews}
            userId={userId && userId}
            refresh={onRefresh}
          />
        </ScrollView>
      </Animated.View>
      <AddReview navigation={props.navigation} />
    </View>
  );
}

export default Reviews;
