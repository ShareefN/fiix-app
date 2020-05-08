import React from "react";
import { Dimensions } from "react-native";
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
import Categories from "../screens/User/Categories/Categories";
import List from "../screens/User/List/List";
import Reviews from "../screens/User/Reviews/Reviews";
import Category from "../screens/User/Categories/Category";
import Contractor from "../screens/User/Categories/Contractor";
import Settings from "../screens/User/Settings/Settings";
import MenuDrawer from "./Drawer";
import UpdatePassword from "../screens/User/Settings/updatePassword";
import Feedback from "../screens/User/Feedback";
import Application1 from "../screens/User/Application/Application1";
import Application2 from "../screens/User/Application/Application2";
import Applicaton3 from "../screens/User/Application/Application3";
import ApplicationSuccess from "../screens/User/Application/ApplicationSuccess";
import ApplicationStatus from "../screens/User/Application/ApplicationStatus";
import Prohibited from "../screens/User/Prohibited";

const WIDTH = Dimensions.get("window").width;

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
    sceneAnimationEnabled: true,
    barStyle: { backgroundColor: "white" }
  }
);

const UserBottomContainer = createAppContainer(UserBottomNavigator);

UserBottomContainer.navigationOptions = { headerShown: false };

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
    category: {
      screen: Category,
      navigationOptions: {
        headerShown: false
      }
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
    feedback: {
      screen: Feedback,
      navigationOptions: {
        headerShown: false
      }
    },
    application1: {
      screen: Application1,
      navigationOptions: {
        headerShown: false
      }
    },
    application2: {
      screen: Application2,
      navigationOptions: {
        headerShown: false
      }
    },
    application3: {
      screen: Applicaton3,
      navigationOptions: {
        headerShown: false
      }
    },
    applicationSuccess: {
      screen: ApplicationSuccess,
      navigationOptions: {
        headerShown: false
      }
    },
    applicationStatus: {
      screen: ApplicationStatus,
      navigationOptions: {
        headerShown: false
      }
    },
    prohibited: {
      screen: Prohibited,
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

const DrawerNavigation = createDrawerNavigator(
  {
    main: { screen: MainStackNavigator },
    tabs: { screen: UserBottomContainer }
  },
  {
    drawerWidth: WIDTH * 0.7,
    contentComponent: MenuDrawer
  }
);

export default AppNavigation = createAppContainer(DrawerNavigation);
