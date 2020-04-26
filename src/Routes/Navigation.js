import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Icon } from "react-native-elements";

import Splash from "../screens/Splash";
import UserLogin from "../screens/Login/userLogin";
import UserRegister from "../screens/Login/userRegister";
import ContractorLogin from "../screens/Login/contractorLogin";
import ContractorHome from "../screens/Contractor/Home";
import Terms from "../screens/Terms";
import Categories from "../screens/User/Categories";
import List from "../screens/User/List";
import Reviews from "../screens/User/Reviews";
import Settings from "../screens/User/Settings";

const UserBottomNavigator = createMaterialBottomTabNavigator(
  {
    list: {
      screen: List,
      navigationOptions: {
        tabBarLabel: "FiiX List",
        tabBarIcon: <Icon name="book" />
      }
    },
    categories: {
      screen: Categories,
      navigationOptions: {
        tabBarLabel: "Categories",
        tabBarIcon: <Icon name="dashboard" />
      }
    },
    reviews: {
      screen: Reviews,
      navigationOptions: {
        tabBarLabel: "Reviews",
        tabBarIcon: <Icon name="grade" />
      }
    }
  },
  {
    initialRouteName: "categories",
    activeTintColor: "black",
    order: ["list", "categories", "reviews"],
    shifting: true,
    barStyle: { backgroundColor: "white" }
  }
);

const UserBottomContainer = createAppContainer(UserBottomNavigator);

UserBottomContainer.navigationOptions = { headerShown: false };

const UserDrawerNavigator = createDrawerNavigator({
  settings: { screen: Settings }
});

const UserDrawer = createAppContainer(UserDrawerNavigator);
UserDrawer.navigationOptions = { headerShown: false };

const MainStackNavigator = createStackNavigator(
  {
    splash: {
      screen: Splash,
      navigationOptions: {
        headerShown: false
      }
    },
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
    userHome: {
      screen: UserBottomContainer
    },
    contractorHome: {
      screen: ContractorHome,
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
    initialRouteName: "splash"
  }
);

export default AppNavigation = createAppContainer(MainStackNavigator);
