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
  Thumbnail,
  Label
} from "native-base";
import { ImageBackground, View, StyleSheet, FlatList, Image } from "react-native";
import AppHeader from "../components/AppHeader.js";
import { Col, Row, Grid } from "react-native-easy-grid";
import { createIconSetFromFontello } from "react-native-vector-icons";
import fontelloConfig from "../config.json";
import TintedOpacity from "../components/TintedOpacity";
import axios from "../components/axios-instance.js";
import { endpoint } from "./props";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import stringoflanguages from './lang';

const CustomIcon = createIconSetFromFontello(fontelloConfig);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 12
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  label: {
    color: material.brandLight,
    margin: "2%",
    marginBottom: 0,
    fontSize: 10,
  },
  text : {
    color: material.brandLight,
    margin: "2%",
    marginBottom: 0,
    fontSize: 20,
  }
});

// Posielanie logov na server
function logStuff(severity, msg) {
  msg = msg.replace(" ", "%20");
  axios.get(`${endpoint}/log/${severity}/${msg}`).catch(err => {
    console.log(err, "ERROR: Could not send log to server.");
  });
}

// Pomocná funkcia pre zoznam
function FullList(props) {
  return <FlatList
    data={props.climbers}
    renderItem={({ item }) =>
      <View>
        <Text key={item.key} style={styles.item}>{item.key}. {item.name}</Text>
      </View>
    }
  />;
}

// Pomocná funkcia pre zoznam
function EmptyList() {
  return <FlatList
    data={[
      { name: 'None', key: 1 },
    ]}
    renderItem={({ item }) => <Text key={item.key} style={styles.item}>{item.name}</Text>}
  />;
}

// Zobrazenie zoznamu, pri nedostupných dátach o lezcoch je zoznam prázdny
function RenderFlatList(props) {
  logStuff("DEBUG", "Rendering list.");
  if (props.problem) {
    if (props.problem.climbers) {
      return <FullList climbers={props.problem.climbers}/>;
    } else {
      logStuff("DEBUG", "List is empty.");
      return <EmptyList />;
    }
  } else {
    logStuff("DEBUG", "List is empty.");
    return <EmptyList />;
  }
}

// Obrazovka zobrazujúca detailný opis vybraného problému s obrázkom, možnosťou pridať problém
// medzi vlastné a zoznamom lezcov, ktorý daný problém vyskúšali.
export default class ProblemDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { problems: [] };
  }

  // Na začiatku sa zistí ID aktuálneho používateľa
  // a načítajú sa informácie o problémoch(všetkých), neskôr sa z nich vyberie aktuálny
  async componentDidMount() {
    logStuff("DEBUG", "Getting problems.");

    let id;
    try {
      id = await AsyncStorage.getItem("id");
    } catch (err) {
      //!!!!!!!!!
      id = 1;
      console.warn(err.message);
    }
    this.setState({ myid: id });

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
              desc: 'No description has been provided by the person who added this problem.',
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

              logStuff("DEBUG", "Climbers and problems successfully fetched.");

              this.setState({
                 problems:problemsCopy, 
              });
            })
            .catch(err => {
              logStuff("WARN", "Cannot fetch climbers.");
              console.err("Error fetching climbers!");
              console.log(err);
            });
        }
      })
      .catch(err => {
        logStuff("WARN", "Cannot fetch problems.");
        console.err("Error fetching problems!");
        console.log(err);
      });
  }

  closeDrawer() {
    this.setState({lang: "changed"});
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  // Pridávanie problému pre lezcov, po pridaní sa zoznam lizcov obnový.
  addProblemToClimber() {
    AsyncStorage.getItem("id")
      .then(id => {
        uid = id || 1;
        pid = this.props.navigation.getParam('id');

        axios.put(`${endpoint}/add/${uid}/${pid}`)
          .then(() => {
            logStuff("DEBUG", `Added problem ${pid} to user ${uid}.`);

            this.refresh(pid);

            //this.setState({list: "changed"});
          })
          .catch(err => {
            console.log(err);
            logStuff("WARN", `Could not add problem ${pid} to user ${uid}.`);
          });

        this.setState({list: "changed"});
      });
  }

  // Obnovenie zoznamu lezcov, všetky údaje sa znova načítajú z databázy
  refresh(pid) {
    axios
              .get(`${endpoint}/climbers`)
                .then(response =>
                  response.data
                )
                .then(climbers => {
                  const climbersForThisProblem = climbers
                  .filter(climber =>
                    climber.myProblems.filter(myProblem =>
                      myProblem.id.problemId === pid
                    ).length >= 1
                  ).map((climber, index) => {
                    climber.key = index + 1;
                    return climber;
                  });

                  let order = 0;
                  for (let p of this.state.problems) {
                    if(p.id === pid)
                      break;
                    order++;
                  }

                  let problemsCopy = JSON.parse(JSON.stringify(this.state.problems));
                  problemsCopy[order].climbers = climbersForThisProblem;

                  logStuff("DEBUG", "Climbers and problems successfully fetched.");

                  this.setState({
                    problems:problemsCopy, 
                  });
                })
                .catch(err => {
                  logStuff("WARN", "Cannot fetch climbers.");
                  console.log("Error fetching climbers!");
                  console.log(err);
                });
  }

  // Zobrazenie obrazovky s detailami, táto obrazovka na zobrazenie potrebuje ID problému,
  // ktorý zobrazuje. Ak žiadny nedostane všetky polia zobrazujú správu Loading...
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
                <ScrollView style={{ margin: "2%" }}>
                  <Row>
                    <Image
                      source={require("../img/boulder.jpg")}
                      style={{ width: '100%', height: 200 }}
                      resizeMode={'cover'}
                    />
                      {/* <Button
                        disabled={true}
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
                      > */}
                        {/* <Thumbnail
                          extra-large
                          source={require("../img/boulder.jpg")}
                          style={{ margin: "10%" }}
                        />
                        <Text>{stringoflanguages.picture}</Text>
                      </Button> */}
              
                    </Row>
                    <Row>
                    <Button
                              style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                height: "100%"
                              }}
                              onPress={() => this.addProblemToClimber()}
                            >
                              <Icon
                                type="FontAwesome5"
                                name="plus"
                                style={{ fontSize: 25, color: "white" }}
                              />
                            </Button>
                    </Row>
                    <Row size={6} style={{ marginVertical: "1%" }}>
                      <Col style={{ padding: "2%", backgroundColor: "#333333" }}>

                          <Label style={styles.label}>
                          {stringoflanguages.name}
                          </Label>
                          <Text style={styles.text}>
                            {(found) ? this.state.problems.filter(p => p.id === problem_id)[0].name : "Loading..."}
                          </Text>

                          <Label style={styles.label}>
                          {stringoflanguages.type}
                          </Label>
                          <Text style={styles.text}>
                            {(found) ? this.state.problems.filter(p => p.id === problem_id)[0].type : "Loading..."}
                          </Text>

                          <Label style={styles.label}>
                          {stringoflanguages.grade}
                          </Label>
                          <Text style={styles.text}>
                            {(found) ? this.state.problems.filter(p => p.id === problem_id)[0].grade : "Loading..."}
                          </Text>

                          <Label style={styles.label}>
                          {stringoflanguages.sector}
                          </Label>
                          <Text style={styles.text}>
                            {(found) ? this.state.problems.filter(p => p.id === problem_id)[0].sector : "Loading..."}
                          </Text>

                          <Label style={styles.label}>
                          {stringoflanguages.description}
                          </Label>
                          <Text style={styles.text}>
                            {(found) ? this.state.problems.filter(p => p.id === problem_id)[0].desc : "Loading..."}
                          </Text>
                      </Col>
                    </Row>


                        <RenderFlatList problem={this.state.problems.filter(p => p.id === problem_id)[0]} />


                </ScrollView>
              </ImageBackground>
            </Content>
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}
