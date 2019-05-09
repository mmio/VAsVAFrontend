import React from "react";
import { Text, Content, Header, H3, List, ListItem } from "native-base";
import axios from "./axios-instance.js";
import AsyncStorage from "@react-native-community/async-storage";
import material from "../native-base-theme/variables/material.js"


export default class SideBar extends React.Component {

  constructor(props)
  {
    super(props)
    this.state =
    {
      admin: false
    };
  }

async logout()
{
  axios.defaults.headers.common["Authorization"] = "";
  await AsyncStorage.removeItem("id");
  await AsyncStorage.removeItem("access_token");
  await AsyncStorage.removeItem("refresh_token");
  await AsyncStorage.removeItem("profilePic");
  this.props.navigation.navigate("Login");
}

  render() {
    
          return (
            <Content style={{ backgroundColor: "#FFFFFF" }}>
              <Header
                style={{
                  flex: 1,
                  flexDirection: "column",
                  backgroundColor: "#232B2B",
                  height: 100,
                  justifyContent: "flex-end",
                  paddingVertical: "10%"
                }}
              >
                <H3>Ahoj</H3>
              </Header>
              <List>
                {this.props.admin &&
                <ListItem button onPress={() => this.props.navigation.navigate("AddProblem")}>
                 <Text style={{color:material.brandDark}}>Pridaj problém</Text>
                </ListItem>
                }             
                <ListItem button onPress={() => this.logout()}>
                  <Text style={{color:material.brandDark}}>Odhlásiť sa!</Text>
                </ListItem>
              </List>
            </Content>
          );
    
  }
}
