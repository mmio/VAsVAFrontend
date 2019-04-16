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
  Input
} from "native-base";
import { Dimensions, ImageBackground, View } from "react-native";
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
                <Icon
                  style={{ color: material.brandLight, alignSelf: "flex-end" }}
                  type="FontAwesome"
                  name="edit"
                />
              </ImageBackground>
              <Text>Marha</Text>

              <Text>Marha</Text>

              <Text>Marha</Text>

              <Tabs style={{ margin: "2%" }}>
                <Tab
                  heading={
                    <TabHeading>
                      <Icon name="camera" />
                      <Text>Camera</Text>
                    </TabHeading>
                  }
                >
                  <ScrollView style={{ height: 175 }} nestedScrollEnabled>
                    <Input />
                    <Text>Marha</Text>

                    <Text>Marha</Text>

                    <Text>Marha</Text>

                    <Text>Marha</Text>

                    <Text>Marha</Text>

                    <Text>Marha</Text>

                    <Text>Marha</Text>

                    <Text>Marha</Text>
                    <Text>PANINI</Text>
                    <Text>PANINI</Text>
                    <Text>PAstafarini</Text>
                  </ScrollView>
                </Tab>
                <Tab
                  heading={
                    <TabHeading>
                      <Text>No Icon</Text>
                    </TabHeading>
                  }
                >
                  <Text>Marha</Text>
                </Tab>
                <Tab
                  heading={
                    <TabHeading>
                      <Icon name="apps" />
                    </TabHeading>
                  }
                >
                  <Text>Marha</Text>
                </Tab>
              </Tabs>
            </Content>
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}
