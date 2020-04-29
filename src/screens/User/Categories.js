import React from "react";
import { Text } from "react-native";
import Header from "./Components/HeaderComponent";
import { userLogout, wake } from "../../Api/api";

function Categories(props) {
  const handelLogout = async () => {
    await userLogout();
    props.navigation.navigate("userLogin");
  };

  wake();

  return (
    <>
      <Header title="Categories" value="categories" />
      <Text>categories screen</Text>
      <Text onPress={() => handelLogout()}>Logout</Text>
    </>
  );
}

export default Categories;
