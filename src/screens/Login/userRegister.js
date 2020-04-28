import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import * as Animated from "react-native-animatable";
import {
  userRegister,
  storeUserToken,
  storeUserCredentials
} from "../../Api/api";

function UserRegister(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    if (username === "" || email === "" || number === "" || password === "") {
      alert("Invalid request, please check inputs");
    } else {
      return userRegister(
        username.username,
        email.email,
        number.number,
        password.password
      )
        .then(({ data }) => {
          storeUserToken(data.token);
          storeUserCredentials(data.User.username, data.User.id);
          props.navigation.navigate("userHome");
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 30 }}>
      <Animated.View
        animation="zoomIn"
        iterationCount={1}
        style={{
          justifyContent: "center"
        }}
      >
        <View style={{ marginHorizontal: 25, marginVertical: 10 }}>
          <Text style={{ fontSize: 25 }}>User Register</Text>
        </View>
        <TextInput
          placeholder="USERNAME"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={username => setUsername({ username })}
          placeholderTextColor="grey"
        />
        <TextInput
          placeholder="EMAIL"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={email => setEmail({ email })}
          placeholderTextColor="grey"
        />
        <TextInput
          placeholder="NUMBER"
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={number => setNumber({ number })}
          placeholderTextColor="grey"
        />
        <TextInput
          placeholder="PASSWORD"
          secureTextEntry
          style={styles.textInput}
          onChangeText={password => setPassword({ password })}
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
            <Text style={{ fontSize: 15, color: "grey", marginVertical: 25 }}>
              Terms and Conditions and Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

export default UserRegister;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)"
  },
  button: {
    backgroundColor: "black",
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25
  },
  registerButton: {
    borderColor: "grey",
    height: 50,
    borderWidth: 2,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25
  }
});
