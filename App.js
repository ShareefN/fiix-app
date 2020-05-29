import React, { useEffect, useState } from "react";
import UserNavigation from "./src/Routes/UserNavigation";
import AuthNavigation from "./src/Routes/AuthNavigation";
import ContractorNavigation from "./src/Routes/ContractorNavigation";
import RNSecureKeyStore from "react-native-secure-key-store";

console.disableYellowBox = true;

export default function App() {

  const [route, setRoute] = useState(null);
  useEffect(() => {
    RNSecureKeyStore.get("user_token").then(res => setRoute("user"));
    RNSecureKeyStore.get("contractor_token").then(res =>
      setRoute("contractor")
    );
  }, []);

  return route && route === "user" ? (
    <UserNavigation />
  ) : route === "contractor" ? (
    <ContractorNavigation />
  ) : (
    <AuthNavigation />
  );
}
