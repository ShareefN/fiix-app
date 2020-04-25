import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Splash from "../screens/Splash";
import UserLogin from "../screens/Login/userLogin";
import UserRegister from "../screens/Login/userRegister";
import ContractorLogin from "../screens/Login/contractorLogin";
import UserHome from "../screens/User/Home";
import ContractorHome from "../screens/Contractor/Home";
import Terms from "../screens/Terms";

const MainStackNavigator = createStackNavigator(
  {
    splash: {
      screen: Splash,
      navigationOptions: {
        header: null
      }
    },
    userLogin: {
      screen: UserLogin,
      navigationOptions: {
        header: null
      }
    },
    userRegister: {
      screen: UserRegister,
      navigationOptions: {
        header: null
      }
    },
    contractorLogin: {
      screen: ContractorLogin,
      navigationOptions: {
        header: null
      }
    },
    userHome: {
      screen: UserHome,
      navigationOptions: {
        header: null
      }
    },
    contractorHome: {
      screen: ContractorHome,
      navigationOptions: {
        header: null
      }
    },
    terms: { screen: Terms, navigationOptions: {
      title: 'Terms',
      headerBackTitle: null
    } }
  },
  {
    initialRouteName: "splash"
  }
);

export default AppNavigation = createAppContainer(MainStackNavigator);
