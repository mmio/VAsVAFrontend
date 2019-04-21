import React from "react";
import SideBar from "../components/SideBar.js";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {
  StyleProvider,
  Container,
  Content,
  Drawer,
  Button,
  Icon,
  Text,
  Thumbnail
} from "native-base";
import { ImageBackground, View, FlatList} from "react-native";
import AppHeader from "../components/AppHeader.js";
import { Col, Row, Grid } from "react-native-easy-grid";
import { createIconSetFromFontello } from "react-native-vector-icons";
import fontelloConfig from "../config.json";
import TintedOpacity from "../components/TintedOpacity.js";
const CustomIcon = createIconSetFromFontello(fontelloConfig);

const styles = {
  button: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  }
};

export default class BoulderProblemScreen extends React.Component {
    constructor(props) {
		super(props);
		this.state = {problems: []};
	}

    componentDidMount() {
        fetch('http://192.168.2.9:8080/Insult')
                .then((response) =>
                    response.json()
                )
                .then((problems) => {
                    this.setState({problems})
                })
                .catch(err => {
                    console.log(err);
                });
	}

  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  render() {
    const problems = this.state.problems;

    const boulderProblemList = problems
    .filter(problem => problem.type === "boulder")
    .map(problem =>
        <View>
            <Text>{problem.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
          <View style={styles.footer}>
            <View><Text>Boulder problems</Text></View>
            {boulderProblemList}
          </View>
        </View>
    );
  }
}
