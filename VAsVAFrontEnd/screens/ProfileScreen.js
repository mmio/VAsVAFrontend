import React from "react";
import SideBar from "../components/SideBar.js";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {
  StyleProvider,
  Container,
  Content,
  Drawer,
  Text,
  Icon,
  Tab,
  Tabs,
  TabHeading,
  List,
  ListItem,
  Item
} from "native-base";
import {
  Dimensions,
  ImageBackground,
  View,
  CheckBox,
  FlatList
} from "react-native";
import AppHeader from "../components/AppHeader.js";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import LoadingPage from "../components/LoadingPage.js";

const win = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFinishedProblems: false,
      user: {},
      isLoading: true
    };
  }
  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  componentDidMount() {
    const id = 16;
    fetch("http://192.168.1.150:8080/climber/" + id)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          user: responseJson,
          isLoading: false
        });
      })
      .catch(error => {
        console.warn(error);
      });
  }

  finishProject(index) {
    let updatedUser = this.state.user;
    updatedUser.myProblems[index].finished = true;
    this.setState({ user: updatedUser });
    fetch("http://192.168.1.150:8080/climber/" + this.state.user.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.user)
    });
  }

  applyFilterFinished() {
    //get from backend filtered
  }

  _keyExtractor = (item, index) => item.problem.id.toString();

  render() {
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
            {this.state.isLoading ? (
              <LoadingPage />
            ) : (
              <Content
                contentContainerStyle={{
                  flex: 1,
                  heigth: "100%",
                  width: "100%",
                  backgroundColor: material.brandDark
                }}
              >
                <ImageBackground
                  source={require("../img/Palino.jpg")}
                  style={{
                    height: win.height * 0.4,
                    justifyContent: "flex-end"
                  }}
                >
                  <LinearGradient
                    colors={["transparent", material.brandDark]}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }}
                    locations={[0.1, 1]}
                  />
                  <Text
                    style={{
                      color: material.brandLight,
                      margin: "2%",
                      marginBottom: 0,
                      fontSize: 24
                    }}
                  >
                    {this.state.user.nickname}
                  </Text>
                  <Text
                    style={{
                      color: material.brandLight,
                      margin: "2%",
                      marginTop: 0,
                      fontSize: 16
                    }}
                  >
                    {this.state.user.status}
                  </Text>
                </ImageBackground>
                <Tabs
                  style={{
                    flex: 1,
                    height: "100%",
                    width: "100%"
                  }}
                >
                  <Tab
                    heading={
                      <TabHeading>
                        <Text>Osobné údaje</Text>
                      </TabHeading>
                    }
                    style={{ flex: 1, height: "100%", width: "100%" }}
                  >
                    <ScrollView>
                      <List>
                        <ListItem>
                          <Text>Meno: </Text>
                          <Text>{this.state.user.name}</Text>
                        </ListItem>
                        <ListItem>
                          <Text>Vek: </Text>
                          <Text>{this.state.user.age}</Text>
                        </ListItem>
                        <ListItem>
                          <Text>Pohlavie: </Text>
                          <Text>
                            {this.state.user.sex == "M" ? "Muž" : "Žena"}
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Text>Najťažšia zlezená obtiažnosť: </Text>
                          <Text>{this.state.user.grade}</Text>
                        </ListItem>
                        <ListItem>
                          <Text>Kontakt: </Text>
                          <Text>{this.state.user.contact}</Text>
                        </ListItem>
                      </List>
                    </ScrollView>
                  </Tab>
                  <Tab
                    heading={
                      <TabHeading>
                        <Text style={{ textAlign: "center" }}>O mne</Text>
                      </TabHeading>
                    }
                    style={{ flex: 1, height: "100%", width: "100%" }}
                  >
                    <ScrollView>
                      <Text style={{ padding: "2%" }}>
                        {this.state.user.bio}
                      </Text>
                    </ScrollView>
                  </Tab>
                  <Tab
                    heading={
                      <TabHeading>
                        <Text style={{ textAlign: "center" }}>
                          Moje problémy
                        </Text>
                      </TabHeading>
                    }
                  >
                    <ScrollView>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          margin: "3%"
                        }}
                      >
                        <Text>Zobrazuj dokončené problémy</Text>
                        <CheckBox
                          value={this.state.showFinishedProblems}
                          onValueChange={this.applyFilterFinished.bind(this)}
                        />
                      </View>
                      <FlatList
                        extraData={this.state}
                        data={this.state.user.myProblems}
                        keyExtractor={this._keyExtractor}
                        renderItem={({ item, index }) => (
                          <View>
                            {item.finished ? (
                              <Item
                                style={{
                                  backgroundColor: "#2ecc71",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  flex: 1,
                                  padding: "3%",
                                  alignContent: "center"
                                }}
                              >
                                <Text
                                  style={{
                                    color: material.brandLight,
                                    width: "60%"
                                  }}
                                >
                                  {item.problem.name}
                                </Text>
                                <Text style={{ color: material.brandLight }}>
                                  {item.problem.grade}
                                </Text>
                                <Text style={{ color: material.brandLight }}>
                                  {item.problem.sector}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    width: 50,
                                    paddingLeft: "2%"
                                  }}
                                >
                                  <Icon
                                    style={{ color: material.brandLight }}
                                    type="FontAwesome5"
                                    name="trash-alt"
                                  />
                                </View>
                              </Item>
                            ) : (
                              <Item
                                style={{
                                  backgroundColor: material.brandLight,
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  flex: 1,
                                  padding: "3%",
                                  alignContent: "center"
                                }}
                              >
                                <Text
                                  style={{
                                    color: material.brandDark,
                                    width: "55%"
                                  }}
                                >
                                  {item.problem.name}
                                </Text>
                                <Text style={{ color: material.brandDark }}>
                                  {item.problem.grade}
                                </Text>
                                <Text style={{ color: material.brandDark }}>
                                  {item.problem.sector}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    width: 50,
                                    paddingLeft: "2%"
                                  }}
                                >
                                  <Icon
                                    onPress={this.finishProject.bind(
                                      this,
                                      index
                                    )}
                                    style={{ color: material.brandDark }}
                                    type="FontAwesome"
                                    name="check"
                                  />
                                  <Icon
                                    style={{ color: material.brandDark }}
                                    type="FontAwesome5"
                                    name="trash-alt"
                                  />
                                </View>
                              </Item>
                            )}
                          </View>
                        )}
                      />
                    </ScrollView>
                  </Tab>
                </Tabs>
              </Content>
            )}
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}
