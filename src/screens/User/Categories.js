import React from "react";
import { Text } from "react-native";
import Header from "../../Components/HeaderComponent";
import {userLogout} from '../../Api/api';

function Categories(props) {
  const handelLogout = async () => {
    await userLogout()
    props.navigation.navigate('userLogin')
  }
  return (
    <>
      <Header title="Categories" />
      <Text>categories screen</Text>
      <Text onPress={() => handelLogout()}>Logout</Text>
    </>
  );
}

export default Categories;
