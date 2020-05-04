import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Header from "../Categories/Components/Header";
import { getUser, updateUser } from "../../../Api/api";
import RNSecureKeyStore from "react-native-secure-key-store";
import { Input } from "react-native-elements";

function Settings(props) {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    number: ""
  });

  useEffect(() => {
    RNSecureKeyStore.get("user_id")
      .then(res => {
        setUserId(res);
      })
      .catch(err => console.log(err));

    me();
  }, []);

  const me = async () => {
    await getUser(userId)
      .then(({ data }) => {
        setUser({
          ...user,
          username: data.username,
          email: data.email,
          number: data.number
        });
      })
      .catch(err => console.log(err));
  };

  const handleUpdateUser = async () => {
    await updateUser(user)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title="Settings" value="settings" navigation={props.navigation} />
      <View
        style={{
          alignItems: "flex-end",
          marginHorizontal: 25,
          marginVertical: 20
        }}
      >
        <TouchableOpacity
          onPress={() => handleUpdateUser()}
          style={{
            backgroundColor: "green",
            height: 25,
            width: 100,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Input
          placeholder="Username"
          label="Username"
          value={user.username}
          containerStyle={{ marginVertical: 20 }}
          onChangeText={value => setUser({ ...user, username: value })}
        />
        <Input
          placeholder="Email"
          label="Email"
          value={user.email}
          containerStyle={{ marginVertical: 20 }}
          onChangeText={value => setUser({ ...user, email: value })}
        />
        <Input
          placeholder="Number"
          label="Number"
          maxLength={10}
          value={user.number}
          containerStyle={{ marginVertical: 20 }}
          onChangeText={value => setUser({ ...user, number: value })}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          height: 50,
          marginHorizontal: 20,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Update Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          height: 50,
          marginHorizontal: 20,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Deactivate account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Settings;
