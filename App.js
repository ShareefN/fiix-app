import React, { useEffect, useState } from "react";
import UserNavigation from "./src/Routes/UserNavigation";
import AuthNavigation from "./src/Routes/AuthNavigation";
import RNSecureKeyStore from "react-native-secure-key-store";

console.disableYellowBox = true;

export default function App() {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    RNSecureKeyStore.get("user_token").then(res =>
      setRoute("user").catch(err => {
        RNSecureKeyStore.get("contractor_token")
          .then(res => setRoute("contractor"))
          .catch(err => setRoute("auth"));
      })
    );
  }, []);

  return route && route === "user" ? (
    <UserNavigation />
  ) : route === "contractor" ? (
    <AuthNavigation />
  ) : (
    <AuthNavigation />
  );
}
