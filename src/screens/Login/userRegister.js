import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import * as Animated from "react-native-animatable";
import {
  userRegister,
  storeUserToken,
  storeUserCredentials
} from "../../Api/api";
import RNRestart from "react-native-restart";
import { DotIndicator } from "react-native-indicators";

function UserRegister(props) {
  const [loadingIndicator, setLoadingIndocator] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    number: "",
    password: ""
  });

  const register = () => {
    if (
      user.username === "" ||
      user.email === "" ||
      user.number === "" ||
      user.password === ""
    ) {
      Alert.alert("Invalid request, please check inputs");
    } else {
      setLoadingIndocator(true);
      return userRegister(user)
        .then(async ({ data }) => {
          await storeUserToken(data.token);
          await storeUserCredentials(data.User.username, data.User.id);
          RNRestart.Restart();
        })
        .catch(err => setLoadingIndocator(false));
    }
  };

  return (
    <SafeAreaView
      style={{ marginVertical: 30, flex: 1 }}
      pointerEvents={loadingIndicator ? "none" : "auto"}
    >
      <Animated.View
        animation="zoomIn"
        iterationCount={1}
        style={{
          justifyContent: "center"
        }}
      >
        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 25 }}>User Register</Text>
        </View>
        <TextInput
          placeholder="USERNAME"
          autoCapitalize
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={username => setUser({ ...user, username: username })}
          value={user.username}
          placeholderTextColor="grey"
        />
        <TextInput
          placeholder="EMAIL"
          keyboardType="email-address"
          autoCapitalize
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={email => setUser({ ...user, email: email })}
          value={user.email}
          placeholderTextColor="grey"
        />
        <TextInput
          placeholder="NUMBER"
          keyboardType="numeric"
          maxLength={10}
          style={styles.textInput}
          onChangeText={number => setUser({ ...user, number: number })}
          value={user.number}
          placeholderTextColor="grey"
        />
        <TextInput
          placeholder="PASSWORD"
          secureTextEntry
          style={styles.textInput}
          onChangeText={password => setUser({ ...user, password: password })}
          value={user.password}
          placeholderTextColor="grey"
        />
        <TouchableOpacity
          style={{ ...styles.button }}
          onPress={() => register()}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Register
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text> ──────── OR ────────</Text>
        </View>
        <TouchableOpacity
          style={{ ...styles.registerButton }}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={{ fontSize: 20, color: "black" }}>Back</Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.navigate("terms")}>
            <Text style={{ fontSize: 15, color: "grey" }}>
              Terms and Conditions and Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <DotIndicator color="black" animating={loadingIndicator} />
    </SafeAreaView>
  );
}

export default UserRegister;

const styles = StyleSheet.create({
  textInput: {
    height: hp("7%"),
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)"
  },
  button: {
    backgroundColor: "black",
    height: hp("7%"),
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15
  },
  registerButton: {
    borderColor: "grey",
    height: hp("7%"),
    borderWidth: 2,
    marginHorizontal: hp("4%"),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15
  }
});
