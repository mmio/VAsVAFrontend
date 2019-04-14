import React from "react";
import { Text, Content, Header, H3, List, ListItem } from "native-base";

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
        <Text>Moje Knihy</Text>
      </ListItem>
    );
  }
}

export default class SideBar extends React.Component {

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
          <AdminOrNot admin={this.props.admin} nav={this.props.navigation} />
          <ListItem button onPress={() => console.warn("Logoff")}>
            <Text>Odhlásiť sa!</Text>
          </ListItem>
        </List>
      </Content>
    );
  }
}
