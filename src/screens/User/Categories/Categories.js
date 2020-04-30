import React, { useEffect } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  View,
  BackHandler
} from "react-native";
import Header from "../Components/HeaderComponent";
import { userLogout, wake } from "../../../Api/api";
import { categories } from "./Components/categories";

function Categories(props) {
  const handelLogout = async () => {
    await userLogout();
    props.navigation.navigate("userLogin");
  };

  wake();

  BackHandler.addEventListener("hardwareBackPress", function() {
    return false;
  });

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
            </TouchableOpacity>
          )}
          keyExtractor={item => item.value}
        />
      </View>
    </>
  );
}

export default Categories;
