import React from "react";
import { Dimensions } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Icon } from "react-native-elements";
import ContractorDrawer from "../Routes/ContractorDrawer";
import RNSecureKeyStore from "react-native-secure-key-store";

import ContractorHome from "../screens/Contractor/Home";
import Terms from "../screens/Terms";
import Competators from "../screens/Contractor/Contractors";

const WIDTH = Dimensions.get("window").width;

const ContractorBottomTab = createMaterialBottomTabNavigator(
  {
    home: {
      screen: ContractorHome,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: <Icon name="person" />
      }
    },
    competators: {
      screen: Competators,
      navigationOptions: {
        tabBarLabel: 'Contractors',
        tabBarIcon: <Icon name="people" />
      }
    }
  },
  {
    initialRouteName: "home",
    activeTintColor: "black",
    order: ["home", "competators"],
    shifting: true,
    sceneAnimationEnabled: true,
    barStyle: { backgroundColor: "white" }
  }
);

const ContractorBottomTabs = createAppContainer(ContractorBottomTab);

ContractorBottomTabs.navigationOptions = { headerShown: false };

const MainStackNavigator = createStackNavigator(
  {
    contractorHome: {
      screen: ContractorBottomTabs
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
    initialRouteName: "contractorHome"
  }
);

const DrawerNavigation = createDrawerNavigator(
  {
    main: { screen: MainStackNavigator },
    tabs: { screen: ContractorBottomTabs }
  },
  {
    drawerWidth: WIDTH * 0.7,
    contentComponent: ContractorDrawer
  }
);

export default UserNavigation = createAppContainer(DrawerNavigation);
