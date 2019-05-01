import React from "react";
import SideBar from "../components/SideBar.js";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {
    StyleProvider,
    Container,
    Content,
    Drawer,
    Button,
    Icon,
    Text,
    Thumbnail
} from "native-base";
import {ImageBackground, View, StyleSheet, FlatList} from "react-native";
import AppHeader from "../components/AppHeader.js";
import {Col, Row, Grid} from "react-native-easy-grid";
import {createIconSetFromFontello} from "react-native-vector-icons";
import fontelloConfig from "../config.json";
import TintedOpacity from "../components/TintedOpacity";

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

function FullList(props) {
    return <FlatList
                data={props.climbers}
                renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
            />;
}

function EmptyList() {
    return <FlatList
                data={[
                    {key: 'None', order: 1},
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
}

function RenderFlatList(props) {
    if (props.problem) {
        if (props.problem.climbers) {
            return <FullList climbers={props.problem.climbers} />;
        } else {
            return <EmptyList />;
        }
    } else {
        return <EmptyList />;
    }
}

export default class ProblemDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {problems: []};
    }

    componentWillMount() {
        fetch('http://10.0.2.2:8080/problems')
            .then((response) =>
                response.json()
            )
            .then((problems) => {
                for (let problem of problems) {
                    fetch('http://10.0.2.2:8080/climbers')
                        .then((response) =>
                            response.json()
                        )
                        .then(climbers => {
                            let climbersForThisProblem = climbers.filter(climber => {
                                return climber.myProblems.filter(myProblem => {
                                    return myProblem.id.problemId === problem.id;
                                }).length >= 1;
                            });

                            this.setState({
                                problems: this.state.problems.concat({
                                    id : problem.id,
                                    climbers: climbersForThisProblem,
                                })
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
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
        const problem_id = this.props.navigation.getParam('id', 5);

        //console.log(this.state.problems);

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
                                <TintedOpacity/>
                                <Grid style={{margin: "2%"}}>
                                    <Row size={6} style={{marginVertical: "1%"}}>
                                        <Col style={{marginRight: "2%"}}>
                                            <Row size={7}>
                                                <Button
                                                    dark
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        width: "100%",
                                                        height: "100%"
                                                    }}
                                                    onPress={() => this.props.navigation.navigate("Profile")}
                                                >
                                                    <Thumbnail
                                                        extra-large
                                                        source={require("../img/Palino.jpg")}
                                                        style={{margin: "10%"}}
                                                    />
                                                    <Text>Moj profil</Text>
                                                </Button>
                                            </Row>
                                            <Row size={2} style={{marginVertical: "1%"}}>
                                                <Col style={{ marginRight: "1%" }}>
                                                    <Button
                                                        style={{
                                                            flex: 1,
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            width: "100%",
                                                            height: "100%"
                                                        }}
                                                        onPress={() => this.props.navigation.navigate("Profile")}
                                                    />
                                                </Col>
                                                <Col style={{ marginLeft: "1%" }}>
                                                    <Button
                                                        style={{
                                                            flex: 1,
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            width: "100%",
                                                            height: "100%"
                                                        }}
                                                        onPress={() => this.props.navigation.navigate("Profile")}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col style={{marginLeft: "2%"}}>
                                            <Row style={{marginBotom: "3%"}}>
                                                <Button
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        width: "100%",
                                                        height: "100%",
                                                        backgroundColor: "#f1c40f"
                                                    }}
                                                    onPress={() => this.props.navigation.navigate("Boulder")}
                                                >
                                                    <Text
                                                        style={{
                                                            textAlign: "center",
                                                            fontSize: 16,
                                                            color: "#232B2B"
                                                        }}
                                                    >
                                                        BOULDER PROBLÉMY
                                                    </Text>
                                                    <Icon
                                                        type="FontAwesome5"
                                                        name="hand-rock"
                                                        style={{fontSize: 50, color: "#232B2B"}}
                                                    />
                                                </Button>
                                            </Row>
                                            <Row style={{marginTop: "3%"}}>
                                                <Button
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        width: "100%",
                                                        height: "100%",
                                                        backgroundColor: "#2980b9"
                                                    }}
                                                    onPress={() => this.props.navigation.navigate("Wall")}
                                                >
                                                    <CustomIcon name="climber" size={60} color="white"/>
                                                    <Text style={{textAlign: "center", fontSize: 16}}>
                                                        PROBLÉMY NA STENE
                                                    </Text>
                                                </Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row size={4}>
                                        <View style={styles.container}>
                                            <RenderFlatList problem={this.state.problems[problem_id]} />
                                        </View>
                                    </Row>
                                </Grid>
                            </ImageBackground>
                        </Content>
                    </Container>
                </Drawer>
            </StyleProvider>
        )
            ;
    }
}
