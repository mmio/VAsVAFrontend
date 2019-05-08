import React from "react";
import { Text, Content, Header, H3, List, ListItem } from "native-base";
import stringoflanguages from '../screens/lang';

function AdminOrNot(props) {
  if (props.admin == true) {
    return (
      <ListItem button onPress={() => props.nav.navigate("AdminListScreen")}>
        <Text>Príspevky na potvrdenie</Text>
      </ListItem>
    );
  } else {
    return (
      <ListItem button onPress={() => props.nav.navigate("Home")}>
        <Text>Domov</Text>
      </ListItem>
    );
  }
}

export default class SideBar extends React.Component {

  changeLanguage(lang) {
    if (lang !== "sk" && lang !== "en") {
      console.log("Wrong language! Defaulting to english (\"en\").")
      changeLanguage("en");
    } else {
      stringoflanguages.setLanguage(lang);
      this.setState({ lang: lang });
    }
  }

  render() {
    return (
      <Content style={{
        backgroundColor: "#232B2B",
      }}>
        <Header
          style={{
            flex: 1,
            flexDirection: "column",
            height: 100,
            justifyContent: "flex-end",
            paddingVertical: "10%",
          }}
        >
          <H3>Navigation</H3>
        </Header>
        <List>
          <AdminOrNot admin={this.props.admin} nav={this.props.navigation} />
          <ListItem button onPress={() => console.warn("Logoff")}>
            <Text>Odhlásiť sa!</Text>
          </ListItem>
          <ListItem button onPress={() => this.changeLanguage("sk")}>
            <Text>SK</Text>
          </ListItem>
          <ListItem button onPress={() => this.changeLanguage("en")}>
            <Text>EN</Text>
          </ListItem>
        </List>
      </Content>
    );
  }
}