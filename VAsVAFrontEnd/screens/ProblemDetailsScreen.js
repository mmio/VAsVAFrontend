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
import { ImageBackground, View, StyleSheet, FlatList } from "react-native";
import AppHeader from "../components/AppHeader.js";
import { Col, Row, Grid } from "react-native-easy-grid";
import { createIconSetFromFontello } from "react-native-vector-icons";
import fontelloConfig from "../config.json";
import TintedOpacity from "../components/TintedOpacity";
import axios from "../components/axios-instance.js";
import { endpoint } from "./props";

const CustomIcon = createIconSetFromFontello(fontelloConfig);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

function FullList(props) {
  return <FlatList
    data={props.climbers}
    renderItem={({ item }) => <Text key={item.key} style={styles.item}>{item.key}. {item.name}</Text>
    }
  />;
}

function EmptyList() {
  return <FlatList
    data={[
      { name: 'None', key: 1 },
    ]}
    renderItem={({ item }) => <Text key={item.key} style={styles.item}>{item.name}</Text>}
  />;
}

function RenderFlatList(props) {
  if (props.problem) {
    if (props.problem.climbers) {
      return <FullList climbers={props.problem.climbers} />;
    } else {
      return <EmptyList />;
    }
  } else {
    return <EmptyList />;
  }
}

export default class ProblemDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { problems: [] };
  }

  componentWillMount() {
    axios
    .get(`${endpoint}/problems`)
      .then((response) =>
        response.data
      )
      .then((problems) => {
        for (let problem of problems) {
          console.log(problem.id);
          this.setState({
            problems: this.state.problems.concat({
              id: problem.id,
              key: problem.id,
              name: problem.name,
              type: problem.type,
              grade: problem.grade,
              sector: problem.sector,
              desc: 'No description',
            })
          });
        }

        return problems;
      })
      .then((problems) => {
        let order = 0;
        for (let problem of problems) {
          axios
          .get(`${endpoint}/climbers`)
            .then(response =>
              response.data
            )
            .then(climbers => {
              const climbersForThisProblem = climbers
              .filter(climber =>
                climber.myProblems.filter(myProblem =>
                  myProblem.id.problemId === problem.id
                ).length >= 1
              ).map((climber, index) => {
                climber.key = index + 1;
                return climber;
              });

              let problemsCopy = JSON.parse(JSON.stringify(this.state.problems));
              problemsCopy[order].climbers = climbersForThisProblem;
              order++;

              this.setState({
                 problems:problemsCopy, 
              });
            })
            .catch(err => {
              console.err("Error fetching climbers!");
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.err("Error fetching problems!");
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
    const problem_id = this.props.navigation.getParam('id');
    const found = this.state.problems.filter(p => p.id === problem_id).length;

    return (
      <StyleProvider style={getTheme(material)}>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={
            <SideBar
              navigation={this.props.navigation}
              closeDrawer={() => this.props.closeDrawer()}
            />
          }
          onClose={() => this.closeDrawer()}
        >
          <Container>
            <AppHeader
              openDrawer={() => this.openDrawer()}
              navigation={this.props.navigation}
            />
            <Content contentContainerStyle={{ flex: 1, heigth: "100%", width: "100%" }}>
              <ImageBackground
                source={require("../img/backgroundImg.jpg")}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  resizeMode: "stretch"
                }}
                blurRadius={0.7}
              >
                <TintedOpacity />
                <Grid style={{ margin: "2%" }}>
                  <Row size={6} style={{ marginVertical: "1%" }}>
                    <Col style={{ padding: "2%", marginRight: "2%", backgroundColor: "#333333" }}>

                      <View>
                        <Text>
                          Name:{(found) ? this.state.problems.filter(p => p.id === problem_id)[0].name : "Loading..."}
                        </Text>
                      </View>

                      <View>
                        <Text>
                          Type: {(found) ? this.state.problems.filter(p => p.id === problem_id)[0].type : "Loading..."}
                        </Text>
                      </View>

                      <View>
                        <Text>
                          Grade: {(found) ? this.state.problems.filter(p => p.id === problem_id)[0].grade : "Loading..."}
                        </Text>
                      </View>

                      <View>
                        <Text>
                          Sector: {(found) ? this.state.problems.filter(p => p.id === problem_id)[0].sector : "Loading..."}
                        </Text>
                      </View>

                      <View>
                        <Text>
                          Description: {(found) ? this.state.problems.filter(p => p.id === problem_id)[0].desc : "Loading..."}
                        </Text>
                      </View>

                    </Col>
                    <Col style={{ marginLeft: "2%" }}>
                      <Row size={7}>
                        <Button
                          dark
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%"
                          }}
                          onPress={() => this.props.navigation.navigate("Profile")}
                        >
                          <Thumbnail
                            extra-large
                            source={require("../img/logo.png")}
                            style={{ margin: "10%" }}
                          />
                          <Text>Obrázok</Text>
                        </Button>
                      </Row>
                      <Row size={2} style={{ marginVertical: "1%" }}>
                        <Col style={{ marginRight: "1%" }}>
                          <Button
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              height: "100%"
                            }}
                            onPress={() => this.props.navigation.navigate("Profile")}
                          >
                            <Icon
                              type="FontAwesome5"
                              name="plus"
                              style={{ fontSize: 25, color: "white" }}
                            />
                          </Button>
                        </Col>
                        <Col style={{ marginLeft: "1%" }}>
                          <Button
                            style={{
                              flex: 1,
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              height: "100%"
                            }}
                            onPress={() => this.props.navigation.navigate("Profile")}
                          >
                            <Icon
                              type="FontAwesome5"
                              name="trash"
                              style={{ fontSize: 25, color: "white" }}
                            />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row size={4}>
                    <View style={styles.container}>
                      <RenderFlatList problem={this.state.problems.filter(p => p.id === problem_id)[0]} />
                    </View>
                  </Row>
                </Grid>
              </ImageBackground>
            </Content>
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}
