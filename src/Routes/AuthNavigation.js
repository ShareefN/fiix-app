import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import UserLogin from "../screens/Login/userLogin";
import UserRegister from "../screens/Login/userRegister";
import ContractorLogin from "../screens/Login/contractorLogin";
import Terms from "../screens/Terms";

const MainStackNavigator = createStackNavigator(
  {
    userLogin: {
      screen: UserLogin,
      navigationOptions: {
        headerShown: false
      }
    },
    userRegister: {
      screen: UserRegister,
      navigationOptions: {
        headerShown: false
      }
    },
    contractorLogin: {
      screen: ContractorLogin,
      navigationOptions: {
        headerShown: false
      }
    },
    terms: {
      screen: Terms,
      navigationOptions: {
        title: "Terms and Conditions",
        headerBackTitle: null
      }
    }
  },
  {
    initialRouteName: "userLogin"
  }
);

export default AuthNavigation = createAppContainer(MainStackNavigator);
