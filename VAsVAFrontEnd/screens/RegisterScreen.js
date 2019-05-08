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
  H2,
  Toast,
} from "native-base";
import {CheckBox, View} from "react-native"
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import { ImageBackground, Image, KeyboardAvoidingView } from "react-native";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import axios from "../components/axios-instance.js";
import Config from "react-native-config";
import toUrlEncoded from "../components/help-scripts/objectToXWWW-FROM.js"
import stringoflanguages from './lang';

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
      password: "",
      repeatPassword: "",
      sex: "M"
    };
  }

  register()
  {
      if(this.state.password !== this.state.repeatPassword)
      {
          Toast.show({
              text: `${stringoflanguages.passDontMatch}`,
              type:"danger",
              buttonText: "Ok"
          });
          return;
      }
      if(this.state.password ==="" || this.state.email ===""|| this.state.repeatPassword ==="")
      {
        Toast.show({
            text: `${stringoflanguages.fillAll}`,
            type:"danger",
            buttonText: "Ok"
        });
        return;
      }
      const details =
      {
          name: this.state.name,
          password: this.state.password,
          sex: this.state.sex
      }
      const formBody = toUrlEncoded(details);
      axios
        .post(Config.BACKEND_URL + "/register", formBody)
        .then(res => {
                Toast.show({
                    text:res.data,
                    type: "success",
                    buttonText: "Ok"
                })
                this.props.navigation.navigate("Login");
            
        })
        .catch(err => {
            console.warn(err.message);
            Toast.show({
                text:err.response.data,
                type: "danger",
                buttonText: "ok"
            });
        });
        

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
                <Card
                  style={{
                    width: "90%",
                    backgroundColor: "#00000090",
                    padding: "5%",
                    alignItems: "center",
                    marginVertical: "5%",
                    flex:1
                  }}
                >
                  <H2 style={{ color: "#fff" }}>`${stringoflanguages.registration}`</H2>
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
                    <Label>`${stringoflanguages.password}`</Label>
                    <Input
                      secureTextEntry
                      name="password"
                      onChangeText={text => this.setState({ password: text })}
                      value={this.state.password}
                      style={{ color: "#fff" }}
                    />
                  </Item>
                  <Item floatingLabel underline style={styles.item}>
                    <Label>`${stringoflanguages.passwordAgain}`</Label>
                    <Input
                      secureTextEntry
                      name="repeatPassword"
                      onChangeText={text => this.setState({ repeatPassword: text })}
                      value={this.state.repeatPassword}
                      style={{ color: "#fff" }}
                    />
                  </Item>
                  <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignContent: "center",
                            borderBottomColor: material.brandLight,
                            borderBottomWidth: 1,
                            backgroundColor: "transparent",
                            height: 50,
                            width:"93%"
                          }}
                        >
                          <Text>`${stringoflanguages.male}`</Text>
                          <CheckBox
                            value={this.state.sex === "M"}
                            onValueChange={text =>
                              this.setState({sex: "M"}
                              )
                            }
                          />
                          <Text>`${stringoflanguages.female}`</Text>
                          <CheckBox
                            value={this.state.sex === "F"}
                            onValueChange={text =>
                                this.setState({sex: "F"}
                                )
                              }
                          />
                        </View>
                  <Button
                    dark
                    style={{ alignSelf: "center", margin:10 }}
                    onPress={this.register.bind(this)}
                  >
                    <Text>`${stringoflanguages.register}`</Text>
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
