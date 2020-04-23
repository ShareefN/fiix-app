import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Splash from "../screens/Splash";
import UserLogin from "../screens/Login/login";

const MainStackNavigator = createStackNavigator(
  {
    splash: { screen: Splash },
    userLogin: { screen: UserLogin }
  },
  {
    initialRouteName: "splash",
    headerMode: "none"
  }
);

export default AppNavigation = createAppContainer(MainStackNavigator);
