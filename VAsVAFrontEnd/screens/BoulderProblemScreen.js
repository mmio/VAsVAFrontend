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
    Button,
    Text,
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
import Config from "react-native-config";

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
        this.state = {
          problems: [],
          grade: undefined,
          maxOver: undefined,
          sector: undefined,
        };
        this.arrayholder = [];
    }

    componentDidMount() {
      axios
        .get(Config.BACKEND_URL + "/problems")
            .then((response) =>
                  response.data
            )
            .then((problems) => {
              const data = problems
                    //.filter(problem => problem.type === "boulder")
                    .map((problem) => {
                        return {
                            key: problem.id,
                            name: problem.name,
                            sector: problem.sector,
                            grade: problem.grade,
                            maxOver: problem.maximumOverhangDegree,
                            type: "boulder"
                        };
                    }
              );

                this.setState({data})
                this.arrayholder = data;
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

    filterAll() {
      const newData = this.arrayholder
      .filter(problem => {
        console.log('sect',this.state.sector);
        console.log('grd',this.state.grade);
        console.log('max',this.state.maxOver);

          return (
            ((this.state.sector != undefined && this.state.sector != 'None')
            ? (problem.sector === this.state.sector)
            : true) &&

            ((this.state.grade != undefined && this.state.grade != 'None')
            ? (problem.grade === this.state.grade)
            : true) &&

            ((this.state.maxOver != undefined && this.state.maxOver != 'None')
            ? (parseFloat(problem.maxOver) <= parseFloat(this.state.maxOver))
            : true)
          );
      })
          this.setState({
            data: newData,
          }, () => {console.log(this.state)});

    }

    filterSections(sector) {
      this.setState({sector}, () => this.filterAll());

      // const newData = this.arrayholder
      //       .filter(problem => {
      //         console.log(sector);
      //         console.log(problem.sector);
      //           return problem.sector == sector;
      //       });
        
      //   this.setState({
      //       data: newData,
      //   });
    }

    filterGrades(grade) {
      this.setState({grade}, () => this.filterAll());
      // const newData = this.arrayholder
      //       .filter(problem => {
      //         console.log(grade);
      //         console.log(problem.grade);
      //           return problem.grade == grade;
      //       });
        
      //   this.setState({
      //       data: newData,
      //   });
    }

    filterMaxOverhang(max) {
      this.setState({maxOver: max}, () => this.filterAll());
      // const newData = this.arrayholder
      //       .filter(problem => {
      //         console.log(max);
      //         console.log(problem.maxOver);
      //           return parseFloat(problem.maxOver) <= parseFloat(max);
      //       });
        
      //   this.setState({
      //       data: newData,
      //   });
    }

    renderFilters = () => {   
      let sectors = [{
          value: 'A2',
        }, {
          value: 'C3',
        }, {
          value: 'None',
        },
      ];

      let grades = [{
          value: '6a',
        }, {
          value: '6-',
        }, {
          value: 'None',
        },
      ];

      let max = [{
          value: '5',
        }, {
          value: '40',
        }, {
          value: 'None',
        },
      ];

      return (
        <View style={styles.drop}>
          <Row>
            <Col style={{ marginHorizontal: "1%" }}>
              <Dropdown
                label={stringoflanguages.grade}
                data={grades}
                value='None'
                onChangeText={(grade) => this.filterGrades(grade)}
              />
            </Col>
            <Col style={{ marginHorizontal: "1%" }}>
              <Dropdown
                label='Max Overhang'
                value='None'
                data={max}
                onChangeText={(max) => this.filterMaxOverhang(max)}
              />
            </Col>
            <Col style={{ marginHorizontal: "1%" }}>
              <Dropdown
                label='Sector'
                data={sectors}
                value='None'
                onChangeText={(sector) => this.filterSections(sector)}
              />
            </Col>
          </Row>
        </View>
      );
    };

    render() {
        // const problems = this.state.problems;

        // const boulderProblemList = problems
        //       .filter(problem => problem.type === "boulder")
        //       .map(problem => {
        //           return {
        //               key: problem.id,
        //               name: problem.name,
        //               type: "boulder"
        //           };
        //       }
        // );

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
                        data={this.state.data}
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
