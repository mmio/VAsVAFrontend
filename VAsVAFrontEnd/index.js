/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Reactotron from "reactotron-react-native";

/*Reactotron
    .configure({host: '10.10.72.41'}) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect*/

AppRegistry.registerComponent(appName, () => App);
