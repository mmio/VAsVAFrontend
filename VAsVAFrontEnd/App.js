import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "./screens/LoginScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import {Root} from "native-base";
import BoulderProblemScreen from "./screens/BoulderProblemScreen.js";
import WallProblemScreen from "./screens/WallProblemScreen.js";
import HighscoreScreen from "./screens/HighscoreScreen.js";
import ProblemDetailsScreen from "./screens/ProblemDetailsScreen.js";
import QrScreen from "./screens/QrScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import AddProblemScreen from "./screens/AddProblemScreen.js"


const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null
      }
    },
    Boulder: {
      screen: BoulderProblemScreen,
      navigationOptions: {
        header: null
      }
    },
    Wall: {
      screen: WallProblemScreen,
      navigationOptions: {
        header: null
      }
    },
    Highscore: {
      screen: HighscoreScreen,
      navigationOptions: {
        header: null
      }
    },
    ProblemDetails: {
      screen: ProblemDetailsScreen,
      navigationOptions: {
        header: null
      }
    },
    Qr: {
      screen: QrScreen,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        header: null
      }
    },
    AddProblem: {
      screen: AddProblemScreen,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}
