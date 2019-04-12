import React from "react";
import {
  StyleProvider,
  Content,
  Container,
  Card,
  Item,
  Input,
  Label,
  Text,
  Button,
  H2
} from "native-base";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {
  ImageBackground,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";

const styles = {
  item: {
    width: "93%",
    color: "#fff",
    backgroundColor: "transparent",
    margin:"3%"
  }
};

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
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
              <KeyboardAvoidingView
                behavior="padding"
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "100%"
                }}
              >
                <HideWithKeyboard style={{ width: "100%", heigth: "100%" }}>
                  <Image
                    source={require("../img/logo.png")}
                    style={{
                      width: "80%",
                      resizeMode: "contain",
                      alignSelf: "center"
                    }}
                  />
                </HideWithKeyboard>

                <Card
                  style={{
                    width: "90%",
                    backgroundColor: "#00000090",
                    padding: "5%",
                    alignItems: "center"
                  }}
                >
                <H2 style={{color:"#fff"}}>Lezecká stena X</H2>
                  <Item
                    floatingLabel
                    underline
                    style={styles.item}
                  >
                    <Label>Email</Label>
                    <Input
                      name="password"
                      onChangeText={text => this.setState({ email: text })}
                      value={this.state.email}
                      style={{color:"#fff"}}
                    />
                  </Item>
                  <Item
                    floatingLabel
                    underline
                    style={styles.item}
                  >
                    <Label>Heslo</Label>
                    <Input
                      secureTextEntry
                      name="password"
                      onChangeText={text => this.setState({ password: text })}
                      value={this.state.password}
                      style={{color:"#fff"}}
                    />
                  </Item>
                  <Button dark style={{alignSelf:"center"}}>
                    <Text>Prihlás!</Text>
                  </Button>
                </Card>
              </KeyboardAvoidingView>
            </ImageBackground>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
