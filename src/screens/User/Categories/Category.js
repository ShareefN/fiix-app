import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
  Image,
  Platform
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { fetchContractors, fetchContractorsByLocation } from "../../../Api/api";
import Header from "./Components/Header";
import * as Animated from "react-native-animatable";
import RNSecureKeyStore from "react-native-secure-key-store";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { DotIndicator } from "react-native-indicators";
import ModalSelector from "react-native-modal-selector";
import { locations } from "../Application/Components/locations";
import AdLargeBanner from "../../../Admobs/LargeBanners";
import AdBanner from "../../../Admobs/Banners";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Category(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [username, setUsername] = useState(null);
  const [loadingIndicator, setLoadingIndocator] = useState(false);
  const [category] = useState(props.navigation.getParam("category"));
  const [contractors, setContractors] = useState(null);
  const [search] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    RNSecureKeyStore.get("username").then(res => {
      setUsername(res);
    });
    getContractors();
  }, [category]);

  const getContractors = async () => {
    setLocation(null);
    setLoadingIndocator(true);
    await fetchContractors(category)
      .then(({ data }) => {
        if (data && data.length === 0) {
          setLoadingIndocator(false);
          setContractors(null);
        } else {
          setLoadingIndocator(false);
          setContractors(data);
        }
      })
      .catch(err => setLoadingIndocator(false));
  };

  const onRefresh = useCallback(() => {
    setLocation(null);
    setRefreshing(true);
    getContractors();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const searchFilterFunction = text => {
    const newData = contractors.filter(item => {
      const itemData = `${item.name.toUpperCase()}   
      ${item.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setContractors(newData);
  };

  const locationFilter = async location => {
    setLoadingIndocator(true);
    setLocation(location);
    await fetchContractorsByLocation(category, location.label).then(
      ({ data }) => {
        setLoadingIndocator(false);
        setContractors(data);
      }
    );
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title={category} navigation={props.navigation} />
      <Animated.View
        animation="zoomIn"
        iterationCount={1}
        style={{ flex: 1 }}
        useNativeDriver={true}
      >
        {!contractors ? (
          <>
            <ScrollView
              style={{ marginHorizontal: 10 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  style={{ width: wp("40%"), height: 150 }}
                  source={require("../../../Assets/notfound.jpg")}
                />
                <Text
                  style={{
                    fontSize: 25,
                    letterSpacing: 2,
                    color: "orange",
                    marginHorizontal: 25,
                    marginVertical: hp("1%")
                  }}
                >
                  Hi {username}!
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: wp("5%"),
                    marginHorizontal: wp("5%"),
                    color: "grey",
                    letterSpacing: 1,
                    textAlign: "center"
                  }}
                >
                  Fiix dons't have any {category} yet! If you have experience in
                  this field,{" "}
                  <Text
                    style={{ fontWeight: "bold" }}
                    onPress={() => props.navigation.navigate("application2")}
                  >
                    Apply!
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20
                }}
              >
                {Platform.OS === "ios" ? (
                  <AdLargeBanner
                    id={"ca-app-pub-6510981239392097/1908185990"}
                  />
                ) : (
                  <AdLargeBanner
                    id={"ca-app-pub-6510981239392097/9354968152"}
                  />
                )}
              </View>
            </ScrollView>
          </>
        ) : (
          <>
            <SearchBar
              placeholder="Search..."
              showLoading={false}
              onChangeText={value => searchFilterFunction(value)}
              value={search}
              lightTheme
              onClear={() => getContractors()}
              showLoading={search}
              containerStyle={{
                backgroundColor: "white",
                borderColor: "white"
              }}
              inputContainerStyle={{ borderRadius: 30 }}
            />
            <ModalSelector
              style={{ marginHorizontal: wp("5%"), marginVertical: hp("2%") }}
              data={locations}
              cancelButtonAccessibilityLabel={"Cancel Button"}
              value={location}
              initValue="Filter by location"
              onChange={value => {
                locationFilter(value);
              }}
            />
            <View style={{ width: wp("50%") }}>
              {Platform.OS === "ios" ? (
                <AdBanner id={"ca-app-pub-6510981239392097/3053940223"} />
              ) : (
                <AdBanner id={"ca-app-pub-6510981239392097/7850314794"} />
              )}
            </View>
            <TouchableOpacity
              onPress={() => getContractors()}
              style={{
                alignItems: "flex-end",
                marginHorizontal: 30,
                display: location ? "flex" : "none"
              }}
            >
              <Text style={{ color: "red", fontSize: 17 }}>Clear filter</Text>
            </TouchableOpacity>
            <ScrollView
              style={{ marginHorizontal: 10 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {contractors &&
                contractors.map((elm, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        props.navigation.navigate("contractor", {
                          contractorId: elm.id,
                          contractorName: elm.name
                        })
                      }
                    >
                      <ListItem
                        title={elm.name}
                        subtitle={`${elm.location} \u2B16 ${elm.timeIn} - ${elm.timeOut}`}
                        subtitleStyle={{ color: "grey" }}
                        bottomDivider
                        leftAvatar={{
                          source: {
                            uri: elm.profileImage
                              ? elm.profileImage
                              : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                          }
                        }}
                        chevron
                      />
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </>
        )}
        <DotIndicator color="black" animating={loadingIndicator} />
      </Animated.View>
    </View>
  );
}

export default Category;
