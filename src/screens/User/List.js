import React from "react";
import { Text } from "react-native";
import Header from "./Components/HeaderComponent";

function List(props) {

  return (
    <>
      <Header title="FiiX List" value="list" />
      <Text>local db list</Text>
    </>
  );
}

export default List;
