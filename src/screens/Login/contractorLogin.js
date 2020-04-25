import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import {
  contractorLogin,
  storeContractorToken,
  storeContractorCredentials
} from "../../Api/api";
import * as Animated from "react-native-animatable";

const { height } = Dimensions.get("window");

function ContractorLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    return contractorLogin(email.email, password.password)
      .then(({ data }) => {
        storeContractorToken(data.token);
        storeContractorCredentials(data.Contractor.id, data.Contractor.name);
        props.navigation.navigate("contractorHome");
      })
      .catch(err => {
        alert("Invalid email or password");
        setPassword("");
      });
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
          <Text style={{ fontSize: 25 }}>Contractor Login</Text>
        </View>
        <TextInput
          placeholder="EMAIL"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={email => setEmail({ email })}
          value={email}
          placeholderTextColor="grey"
        />
        <TextInput
          placeholder="PASSWORD"
          secureTextEntry
          style={styles.textInput}
          onChangeText={password => setPassword({ password })}
          value={password}
          placeholderTextColor="grey"
        />
        <View style={{ alignItems: "flex-end", marginRight: 30 }}>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ ...styles.button }} onPress={() => login()}>
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
          <TouchableOpacity onPress={() => props.navigation.navigate('terms')}>
            <Text style={{ fontSize: 15, color: "grey", marginVertical: 25 }}>
              Terms and Conditions and Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

export default ContractorLogin;

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
