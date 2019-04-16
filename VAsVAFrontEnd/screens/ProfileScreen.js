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
  ListItem
} from "native-base";
import { Dimensions, ImageBackground, View, CheckBox } from "react-native";
import AppHeader from "../components/AppHeader.js";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
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

const win = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFinishedProblems: false
    };
  }
  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

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
                  PALINO BOOOOI
                </Text>
                <Text
                  style={{
                    color: material.brandLight,
                    margin: "2%",
                    marginTop: 0,
                    fontSize: 16
                  }}
                >
                  Boooooulder4lyfe
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
                        <Text>Pavol Šoltés</Text>
                      </ListItem>
                      <ListItem>
                        <Text>Vek: </Text>
                        <Text>21</Text>
                      </ListItem>
                      <ListItem>
                        <Text>Pohlavie: </Text>
                        <Text>Muž</Text>
                      </ListItem>
                      <ListItem>
                        <Text>Najťažšia zlezená obtiažnosť: </Text>
                        <Text>6a</Text>
                      </ListItem>
                      <ListItem>
                        <Text>Kontakt: </Text>
                        <Text>
                          soltes.pavol@gmail, @PalinoBoy twitter alebo insta
                          @PalinoBoooooi
                        </Text>
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
                      Som ciciak z ciciny a toto je moj pribeh. Numquam
                      prodesset intellegam at vix. Sed elitr atomorum ad, eros
                      pertinacia accommodare his id. Sumo noluisse his te. Sit
                      ne illum discere tractatos, oblique invidunt cotidieque
                      pro ut. Cum ad prima democritum. Som ciciak z ciciny a
                      toto je moj pribeh. Numquam prodesset intellegam at vix.
                      Sed elitr atomorum ad, eros pertinacia accommodare his id.
                      Sumo noluisse his te. Sit ne illum discere tractatos,
                      oblique invidunt cotidieque pro ut. Cum ad prima
                      democritum.
                    </Text>
                  </ScrollView>
                </Tab>
                <Tab
                  heading={
                    <TabHeading>
                      <Text style={{ textAlign: "center" }}>Moje problémy</Text>
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
                        onValueChange={() =>
                          this.setState({
                            showFinishedProblems: !this.state
                              .showFinishedProblems
                          })
                        }
                      />
                    </View>
                    <List>
                      <ListItem>
                        
                      </ListItem>
                    </List>
                  </ScrollView>
                </Tab>
              </Tabs>
            </Content>
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}
