import React, { useEffect } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  View,
  Platform
} from "react-native";
import Header from "../Components/HeaderComponent";
import { userLogout, wake } from "../../../Api/api";
import { categories } from "./Components/categories";

function Categories(props) {
  // const Banner = firebase.admob.Banner;
  // const AdRequest = firebase.admob.AdRequest;
  // const request = new AdRequest();

  const unitId =
    Platform.OS === "ios"
      ? "ca-app-pub-6510981239392097/1800299468"
      : "ca-app-pub-6510981239392097/7346505079";

  const handelLogout = async () => {
    await userLogout();
    props.navigation.navigate("userLogin");
  };

  wake();

  return (
    <>
      <Header title="Categories" value="categories" />
      {/* <Text onPress={() => handelLogout()}>Logout</Text> */}
      <View
        style={{
          marginBottom: 80,
          alignItems: "center",
          backgroundColor: "white"
        }}
      >
        <FlatList
          style={{ flexDirection: "column" }}
          numColumns={2}
          ItemSeparatorComponent={() => (
            <View style={{alignItems: 'center'}}>
              <Text>Ad BANNER goes here!</Text>
              {/* // <Banner
            //   unitId={unitId}
            //   size={"SMART_BANNER"}
            //   request={request.build()}
            //   onAdLoaded={() => {
            //     console.log("Advert loaded");
            //   }}
            //   onAdFailedToLoad={() => {
            //     console.log("Advert failed to load!!!!");
            //   }}
            // /> */}
            </View>
          )}
          showsVerticalScrollIndicator={false}
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginVertical: 15
              }}
              onPress={() =>
                props.navigation.navigate("category", {
                  category: item.label
                })
              }
            >
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 10,
                  marginHorizontal: 20
                }}
                source={{
                  uri: item.image
                }}
              />
              <Text style={{ marginTop: 10, fontSize: 15, fontWeight: "bold" }}>
                {item.label}
              </Text>
              <Text>{item.translation}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.translation}
        />
      </View>
    </>
  );
}

export default Categories;
