import React from 'react';
import SideBar from "../components/SideBar.js";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {ListItem, SearchBar} from 'react-native-elements';
import {
    StyleProvider,
    Container,
    Content,
    Drawer,
    List,
} from "native-base";
import {FlatList, StyleSheet, View} from "react-native";
import AppHeader from "../components/AppHeader.js";
import {createIconSetFromFontello} from "react-native-vector-icons";
import fontelloConfig from "../config.json";
import { endpoint } from "./props";
import axios from "../components/axios-instance.js";

import axiosInstance from '../components/axios-instance.js';

const CustomIcon = createIconSetFromFontello(fontelloConfig);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

export default class HighscoreScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: false,      
            data: [],      
            error: null,
            search: "", 
        };

        this.arrayholder = [];
    }

    componentDidMount() {
        this.setState({loading: true});

        axios
        .get(`${endpoint}/climbers`)
            .then(response =>
                response.data
            )
            .then((climbers) => {
                const data = climbers.map((climber, i) => {
                    return {
                        key: i,
                        name: climber.name,
                        problem_count: climber.myProblems.length,
                        score: climber.myProblems.length * i * 100 + " bodov",
                    };
                }).sort((a, b) => a.score < b.score);

                this.setState({
                    data: data,   
                    loading: false,
                });

                this.arrayholder = data;
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: err,
                    loading: false,
                });
            });
    }

    closeDrawer() {
        this.drawer._root.close();
    }

    openDrawer() {
        this.drawer._root.open();
    }

    searchFilterFunction = text => {
        const newData = this.arrayholder
            .filter(climber => {
                return climber.name.indexOf(text) > -1;
            });
        
        this.setState({
            data: newData,
            search: text,
        });
      };

      renderSearch = () => {    
        return (      
          <SearchBar        
            placeholder="Type Here..."        
            lightTheme        
            round        
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.search}           
          />    
        );  
      };

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
                        <List contentContainerStyle={{flex: 1, heigth: "100%", width: "100%"}}>
                            <FlatList
                                ListHeaderComponent={this.renderSearch}                       
                                data={this.state.data}
                                renderItem={({item}) =>
                                    <ListItem
                                        key={item.key}
                                        leftAvatar={{source: require("../img/Palino.jpg")}}
                                        title={item.name}
                                        subtitle={item.score}
                                        onPress={() => this.props.navigation.navigate("Wall")}
                                    />
                                }
                            />
                        </List>
                    </Container>
                </Drawer>
            </StyleProvider>
        );
    }
}
