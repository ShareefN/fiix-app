import React from "react";
import { Dimensions } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Icon } from "react-native-elements";
import ContractorDrawer from "../Routes/ContractorDrawer";

import ContractorHome from "../screens/Contractor/Home";
import Competators from "../screens/Contractor/Contractors";
import Contractor from "../screens/Contractor/Contractor/Contractor";
import TodoList from "../screens/Contractor/TodoList";
import Settings from "../screens/Contractor/Settings/settings";
import UpdatePassword from "../screens/Contractor/Settings/updatePassword";
import Feedback from "../screens/Contractor/Feedback";
import Terms from "../screens/Terms";
import Prohibited from "../screens/Prohibited";

const WIDTH = Dimensions.get("window").width;

const ContractorBottomTab = createMaterialBottomTabNavigator(
  {
    list: {
      screen: TodoList,
      navigationOptions: {
        tabBarLabel: "FiiX List",
        tabBarIcon: <Icon name="class" />
      }
    },
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
        tabBarLabel: "Contractors",
        tabBarIcon: <Icon name="people" />
      }
    }
  },
  {
    initialRouteName: "home",
    activeTintColor: "black",
    order: ["list", "home", "competators"],
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
    contractor: {
      screen: Contractor,
      navigationOptions: {
        headerShown: false
      }
    },
    settings: {
      screen: Settings,
      navigationOptions: {
        headerShown: false
      }
    },
    updatePassword: {
      screen: UpdatePassword,
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
    },
    feedback: {
      screen: Feedback,
      navigationOptions: {
        headerShown: false
      }
    },
    prohibited: {
      screen: Prohibited,
      navigationOptions: {
        headerShown: false
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
