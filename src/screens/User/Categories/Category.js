import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
  Dimensions,
  Image
} from "react-native";
import { ListItem } from "react-native-elements";
import { fetchContractors } from "../../../Api/api";
import Header from "./Components/Header";
import * as Animated from "react-native-animatable";
import RNSecureKeyStore from "react-native-secure-key-store";
import Database from "../Database/favoriteDB";

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const { width } = Dimensions.get("window");

function Category(props) {
  const [refreshing, setRefreshing] = useState(false);
  const [username, setUsername] = useState(null);
  const [category] = useState(props.navigation.getParam("category"));
  const [favFlag, setFavFlag] = useState(false);
  const [contractors, setContractors] = useState(null);

  const favDb = new Database();

  useEffect(() => {
    RNSecureKeyStore.get("username").then(res => {
      setUsername(res);
    });
    getContractors();
  }, [category]);

  const getContractors = async () => {
    await fetchContractors(category)
      .then(({ data }) => {
        if (data && data.length === 0) {
          setContractors(null);
        } else {
          setContractors(data);
        }
      })
      .catch(err => console.log(err));
  };

  const fetchFav = async () => {
    await favDb.getFavorites().then(data => {
      data.forEach(element => {
        contractors &&
          contractors.forEach(elm => {
            if (element.contractorId === elm.id) {
              setFavFlag(true);
            }
          });
      });
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getContractors();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title={category} navigation={props.navigation} />
      <Animated.View animation="zoomIn" iterationCount={1} style={{ flex: 1 }}>
        {!contractors ? (
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
              source={require("../../../Assets/notfound.jpg")}
            />
            <Text
              style={{
                fontSize: 35,
                color: "orange",
                marginHorizontal: 25,
                marginVertical: 25
              }}
            >
              Hi {username}!
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginHorizontal: 30,
                color: "grey",
                textAlign: "center"
              }}
            >
              Unfortunately there's no contractors for this category yet! If
              you're intrested in making money and have experince in this
              category click {"\n"}
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "black" }}
              >
                Apply.
              </Text>
            </Text>
          </View>
        ) : (
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
                      title={`${elm.name} - Rating`}
                      subtitle={`${elm.location}, ${elm.timeIn} - ${elm.timeOut}`}
                      subtitleStyle={{ color: "grey" }}
                      bottomDivider
                      leftAvatar={{
                        source: {
                          uri: elm.profileImage
                            ? elm.profileImage
                            : "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                        }
                      }}
                      rightIcon={{ name: favFlag ? "favorite" : null }}
                      chevron
                    />
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
}

export default Category;
