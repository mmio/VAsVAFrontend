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
import { ImageBackground, View } from "react-native";
import AppHeader from "../components/AppHeader.js";
import { Col, Row, Grid } from "react-native-easy-grid";
import { createIconSetFromFontello } from "react-native-vector-icons";
import fontelloConfig from "../config.json";
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
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.65)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}
                />
                <Grid style={{ margin: "2%" }}>
                  <Row size={11} style={{ marginVertical: "1%" }}>
                    <Col style={{ marginRight: "2%" }}>
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
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 16,
                              color: "#232B2B"
                            }}
                          >
                            BOULDER PROBLÉMY
                          </Text>
                          <Icon
                            type="FontAwesome5"
                            name="hand-rock"
                            style={{ fontSize: 50, color: "#232B2B" }}
                          />
                        </Button>
                      </Row>
                      <Row style={{ marginTop: "3%" }}>
                        <Button
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#2980b9"
                          }}
                        >
                          <CustomIcon name="climber" size={60} color="white" />
                          <Text style={{ textAlign: "center", fontSize: 16 }}>
                            PROBLÉMY NA STENE
                          </Text>
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                  <Row size={5} style={{ marginVertical: "1%" }}>
                    <Col size={2} style={{ marginRight: "2%" }}>
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
                        <Text style={{ fontSize: 20 }}>MAPA</Text>
                        <Icon
                          type="FontAwesome5"
                          name="map-marked-alt"
                          style={{ fontSize: 45 }}
                        />
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
                        <Icon
                          type="FontAwesome"
                          name="qrcode"
                          style={{ fontSize: 60, color: "#232B2B" }}
                        />
                        <Text style={{ color: "#232B2B" }}>SKENUJ QR KÓD</Text>
                      </Button>
                    </Col>
                  </Row>
                  <Row size={4} style={{ marginVertical: "1%" }}>
                    <Button
                      dark
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%"
                      }}
                    >
                      <Icon type="FontAwesome5" name="bars" />
                      <Text style={{ fontSize: 26 }}>REBRÍČEK</Text>
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
