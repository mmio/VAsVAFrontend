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

export default class WallProblemScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {problems: []};
    }

    componentDidMount() {
        axios
        .get(`${endpoint}/problems/`)
        .then((problems) => {
            console.log(problems.data);
            this.setState({problems: problems.data})
        })
        .catch(err => {
            console.warn("user details: " + err.message);
        });
    }

    closeDrawer() {
        this.drawer._root.close();
    }

    openDrawer() {
        this.drawer._root.open();
    }

    render() {
        const problems = this.state.problems;

        const boulderProblemList = problems
            .filter(problem => problem.type === "stena")
            .map(problem => {
                    return {
                        key: problem.id,
                        name: problem.name,
                        type: "stena"
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
                            <View style={styles.container}>
                                <FlatList
                                    data={boulderProblemList}
                                    renderItem={({item}) =>
                                        <ListItem
                                            key={item.key}
                                            title={item.name}
                                            subtitle={item.type}
                                            onPress={() => this.props.navigation.navigate("ProblemDetails", {id: item.key})}
                                        />
                                    }
                                />
                            </View>
                        </Content>
                    </Container>
                </Drawer>
            </StyleProvider>
        );
    }
}