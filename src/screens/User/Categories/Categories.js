import React from "react";
import { Text, FlatList, TouchableOpacity, Image, View } from "react-native";
import Header from "../Components/HeaderComponent";
import { categories } from "./Components/categories";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

function Categories(props) {
  return (
    <>
      <Header
        title="Categories"
        value="categories"
        navigation={props.navigation}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white"
        }}
      >
        <FlatList
          style={{ flexDirection: "column" }}
          numColumns={2}
          ItemSeparatorComponent={() => (
            <View style={{ alignItems: "center" }}>
              <Text>Ad BANNER goes here!</Text>
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
                  flex:1,
                  width: wp("40%"),
                  height: 150,
                  borderRadius: 10,
                  marginHorizontal: wp("2%")
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
