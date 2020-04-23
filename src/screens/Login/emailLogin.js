import React, { useState } from "react";
import { Text, Button } from "react-native";
import { userLogin } from "../../Api/api";

function Email(props) {
  const [data, setData] = useState(null);

  const login = async (email, password) => {
    return userLogin("shareef@gmail.com", "123123")
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err)
      });
  };

  return (
    <>
      <Text>Press to test</Text>
      <Text>{data}</Text>
      <Button title="press to test" onPress={() => login()} />
    </>
  );
}

export default Email;
