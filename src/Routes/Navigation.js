import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Splash from "../screens/Splash";
import UserLogin from "../screens/Login/userLogin";
import UserRegister from '../screens/Login/userRegister';
import ContractorLogin from "../screens/Login/contractorLogin";

const MainStackNavigator = createStackNavigator(
  {
    splash: {
      screen: Splash
    },
    userLogin: { screen: UserLogin },
    userRegister: {screen: UserRegister},
    contractorLogin: { screen: ContractorLogin }
  },
  {
    initialRouteName: "splash",
    headerMode: "none"
  }
);

export default AppNavigation = createAppContainer(MainStackNavigator);
