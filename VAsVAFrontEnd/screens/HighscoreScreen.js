import React from 'react';
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
import {FlatList, StyleSheet, View} from "react-native";
import AppHeader from "../components/AppHeader.js";
import {createIconSetFromFontello} from "react-native-vector-icons";
import fontelloConfig from "../config.json";

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
        this.state = {climbers: []};
    }

    componentWillMount() {
        fetch('http://10.0.2.2:8080/climbers')
            .then((response) =>
                response.json()
            )
            .then((climbers) => {
                this.setState({climbers})
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

    render() {
        const climbers = this.state.climbers;

        const climbersList = climbers
            .map((climber, i) => {
                    return {
                        key: i,
                        name: climber.name
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
                                    data={climbersList}
                                    renderItem={({item}) =>
                                        <ListItem
                                            key={item.key}
                                            leftAvatar={{source: {uri: "img_here"}}}
                                            title={item.name}
                                            subtitle={item.name}
                                            onPress={() => this.props.navigation.navigate("Wall")}
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
