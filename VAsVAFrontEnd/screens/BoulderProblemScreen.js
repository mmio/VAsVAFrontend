import React from "react";
import SideBar from "../components/SideBar.js";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {ListItem} from 'react-native-elements';
import {
    StyleProvider,
    Container,
    Content,
    Drawer,
} from "native-base";
import {View, FlatList, StyleSheet} from "react-native";
import AppHeader from "../components/AppHeader.js";
import {createIconSetFromFontello} from "react-native-vector-icons";
import fontelloConfig from "../config.json";
import axios from "../components/axios-instance.js";
import { endpoint } from "./props";
import { Dropdown } from 'react-native-material-dropdown';
import { Col, Row } from "react-native-easy-grid";
import stringoflanguages from './lang';

const CustomIcon = createIconSetFromFontello(fontelloConfig);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    drop: {
      padding: 10,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

export default class BoulderProblemScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {problems: []};
    }

    componentWillMount() {
      axios
        .get(`${endpoint}/problems`)
            .then((response) =>
                  response.data
            )
            .then((problems) => {
                this.setState({problems})
            })
            .catch(err => {
                console.log(err);
            });
    }

    closeDrawer() {
        this.drawer._root.close();
    }

    openDrawer() {
        this.drawer._root.open();
    }

    filterSections(selection) {
      console.log(selection);
    }

    filterGrades(selection) {
      console.log(selection);
    }

    filterOverhangs(selection) {
      console.log(selection);
    }

    renderFilters = () => {   
      let sections = [{
          value: 'A2',
        }, {
          value: 'C3',
        },
      ];

      let data = [
        {
          value: 'w',
        },
      ];

      return (
        <View style={styles.drop}>
          <Row>
            <Col style={{ marginHorizontal: "1%" }}>
              <Dropdown
                label={stringoflanguages.grade}
                data={data}
              />
            </Col>
            <Col style={{ marginHorizontal: "1%" }}>
              <Dropdown
                label='Max Overhang'
                data={data}
              />
            </Col>
            <Col style={{ marginHorizontal: "1%" }}>
              <Dropdown
                label='Sector'
                data={sections}
                onChangeText={(selection) => this.filterSections(selection)}
              />
            </Col>
          </Row>
        </View>
      );
    };

    render() {
        const problems = this.state.problems;

        const boulderProblemList = problems
              .filter(problem => problem.type === "boulder")
              .map(problem => {
                  return {
                      key: problem.id,
                      name: problem.name,
                      type: "boulder"
                  };
              }
        );

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
                  <Content contentContainerStyle={{flex: 1, heigth: "100%", width: "100%"}}>
                    {/* <View style={styles.container}> */}
                      
                      <FlatList
                        ListHeaderComponent={this.renderFilters}
                        data={boulderProblemList}
                        renderItem={({item}) =>
                                    <ListItem
                                      key={item.key}
                                      title={item.name}
                                      subtitle={item.type}
                                      onPress={() => this.props.navigation.navigate("ProblemDetails", {id: item.key})}
                                    />}
                      />
                    {/* </View> */}
                  </Content>
                </Container>
              </Drawer>
	    </StyleProvider>
        );
    }
}
