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
import { DotIndicator } from "react-native-indicators";
import { userLogin, storeUserToken, storeUserCredentials } from "../../Api/api";
import * as Animated from "react-native-animatable";
import RNRestart from "react-native-restart";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

function UserLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingIndicator, setLoadingIndocator] = useState(false);

  const login = () => {
    setLoadingIndocator(true);
    return userLogin(email.email, password.password)
      .then(async ({ data }) => {
        await storeUserToken(data.token);
        await storeUserCredentials(data.User.username, data.User.id);
        RNRestart.Restart();
      })
      .catch(err => {
        setLoadingIndocator(false);
        Alert.alert("Invalid email or password");
        setPassword("");
      });
  };

  return (
    <SafeAreaView style={{ marginTop: 30, flex: 1 }} pointerEvents={loadingIndicator ? 'none' : 'auto'}>
      <Animated.View
        animation="zoomIn"
        iterationCount={1}
        style={{
          justifyContent: "center"
        }}
      >
        <View style={{ marginHorizontal: 25, marginVertical: 10 }}>
          <Text style={{ fontSize: 25 }}>User Login</Text>
        </View>
        <TextInput
          placeholder="EMAIL"
          autoCorrect={false}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => setEmail({ email })}
          placeholderTextColor="grey"
          value={email.email}
        />
        <TextInput
          placeholder="PASSWORD"
          secureTextEntry
          style={styles.textInput}
          onChangeText={password => setPassword({ password })}
          placeholderTextColor="grey"
          value={password.password}
        />
        <View style={{ alignItems: "flex-end", marginRight: 30 }}>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: loadingIndicator ? "grey" : "black"
          }}
          onPress={() => login()}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            SIGN IN
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
          onPress={() => props.navigation.navigate("userRegister")}
        >
          <Text style={{ fontSize: 20, color: "black" }}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.registerButton,
            marginVertical: 0,
            borderColor: "grey"
          }}
          onPress={() => props.navigation.navigate("contractorLogin")}
        >
          <Text style={{ fontSize: 20, color: "black" }}>
            I'm a FiiX Contractor
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("terms")}
          >
            <Text style={{ fontSize: 15, color: "grey", marginVertical: 25 }}>
              Terms and Conditions and Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <DotIndicator color="black" animating={loadingIndicator} />
    </SafeAreaView>
  );
}

export default UserLogin;

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
