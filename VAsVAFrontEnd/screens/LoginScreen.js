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
import { ImageBackground, Image, KeyboardAvoidingView } from "react-native";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import objectToXWWW from "../components/help-scripts/objectToXWWW-FROM.js"

const styles = {
  item: {
    width: "93%",
    color: "#fff",
    backgroundColor: "transparent",
    margin: "3%"
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

  login() {
    var details = {
      grant_type: "password",
      password: this.state.password,
      username: this.state.email
    };

    formBody = objectToXWWW(details);
    axios
      .post("http://192.168.1.150:8080/oauth/token", formBody, {
        auth: {
          username: "myClientPassword",
          password: "secret"
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(async (res) => {
        try{
          await AsyncStorage.setItem("access_token", res.data.access_token)
          await AsyncStorage.setItem("refresh_token", res.data.refresh_token);
          await AsyncStorage.setItem("id", JSON.stringify(res.data.id));
          axios.defaults.headers.common["Authorization"] =
                "Bearer " + res.data.access_token;
          this.props.navigation.navigate("Home");
        }catch(err)
        {
          console.warn(err.message);
        }


      })
      .catch(err => console.warn(err.message));
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
                    alignItems: "center",
                    marginVertical: "5%"
                  }}
                >
                  <H2 style={{ color: "#fff" }}>Lezecká stena X</H2>
                  <Item floatingLabel underline style={styles.item}>
                    <Label>Email</Label>
                    <Input
                      name="password"
                      onChangeText={text => this.setState({ email: text })}
                      value={this.state.email}
                      style={{ color: "#fff" }}
                    />
                  </Item>
                  <Item floatingLabel underline style={styles.item}>
                    <Label>Heslo</Label>
                    <Input
                      secureTextEntry
                      name="password"
                      onChangeText={text => this.setState({ password: text })}
                      value={this.state.password}
                      style={{ color: "#fff" }}
                    />
                  </Item>
                  <Button
                    dark
                    style={{ alignSelf: "center" }}
                    onPress={this.login.bind(this)}
                  >
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
