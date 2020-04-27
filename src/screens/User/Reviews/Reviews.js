import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import Header from "../../../Components/HeaderComponent";
import { Divider } from "react-native-elements";
import { getReviews } from "../../../Api/api";
import ReviewsList from "./reviewsList";
import RNSecureKeyStore from "react-native-secure-key-store";
import AddReview from "./Components/AddFab";
import * as Animated from "react-native-animatable";

function Reviews(props) {
  const [userId, setUserId] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    RNSecureKeyStore.get("user_id").then(res => {
      setUserId(res);
    });

    const fetchReviews = async () => {
      await getReviews()
        .then(({ data }) => setReviews(data))
        .catch(err => console.log(err));
    };
    fetchReviews();
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title="Reviews" />
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Text style={{ fontSize: 20 }}>What people have to say about FiiX</Text>
      </View>
      <Divider style={{ backgroundColor: "black", marginHorizontal: 10 }} />
      <Animated.View animation="zoomIn" iterationCount={1} style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ReviewsList list={reviews && reviews} userId={userId && userId} />
        </ScrollView>
      </Animated.View>
      <AddReview navigation={props.navigation} />
    </View>
  );
}

export default Reviews;
