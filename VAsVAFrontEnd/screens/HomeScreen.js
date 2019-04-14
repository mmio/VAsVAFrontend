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
import { ImageBackground } from "react-native";
import AppHeader from "../components/AppHeader.js";
import { Col, Row, Grid } from "react-native-easy-grid";

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

export default class HomeScreen extends React.Component {
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
              contentContainerStyle={{ flex: 1, heigth: "100%", width: "100%" }}
            >
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
                <Grid style={{ margin: "2%" }}>
                  <Row size={5} style={{ marginVertical: "1%" }}>
                    <Col style={{ marginRight: "2%" }}>
                      <Button dark
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Thumbnail
                          extra-large
                          source={require("../img/Palino.jpg")}
                          style={{ margin: "10%" }}
                        />
                        <Text>Moj profil</Text>
                      </Button>
                    </Col>
                    <Col style={{ marginLeft: "2%" }}>
                      <Row style={{ marginBotom: "3%" }}>
                        <Button
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#f1c40f"
                          }}
                        >
                          <Text>BOULDER PROBLÉMY</Text>
                          <Icon type="FontAwesome5" name="hand-rock" />
                        </Button>
                      </Row>
                      <Row style={{ marginTop: "3%" }}>
                        <Button
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#2980b9"
                          }}
                        >
                          <Text>PROBLÉMY NA STENE</Text>
                          <Icon type="FontAwesome5" name="hand-rock" />
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                  <Row size={3} style={{ marginVertical: "1%" }}>
                    <Col size={1} style={{ marginRight: "2%" }}>
                      <Button
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#2980b9"
                        }}
                      >
                        <Text>MAPA</Text>
                        <Icon type="FontAwesome5" name="hand-rock" />
                      </Button>
                    </Col>
                    <Col size={3} style={{ marginLeft: "2%" }}>
                      <Button
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#d35400"
                        }}
                      >
                        <Text>Boulder problémy</Text>
                        <Icon type="FontAwesome5" name="hand-rock" />
                      </Button>
                    </Col>
                  </Row>
                  <Row size={2} style={{ marginVertical: "1%" }}>
                    <Button dark
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Icon type="FontAwesome5" name="bars" />
                      <Text style={{fontSize:26}}>REBRÍČEK</Text>
                    </Button>
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
