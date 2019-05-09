import React from "react";
import SideBar from "../components/SideBar.js";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {
  StyleProvider,
  Container,
  Content,
  Drawer,
  Text,
  Icon,
  Tab,
  Tabs,
  TabHeading,
  List,
  ListItem,
  CardItem,
  Button,
  Item,
  Label,
  Input,
  Textarea,
  Toast
} from "native-base";
import {
  Dimensions,
  ImageBackground,
  View,
  CheckBox,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import AppHeader from "../components/AppHeader.js";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import LoadingPage from "../components/LoadingPage.js";
import PhotoGrid from "react-native-image-grid";
import Modal from "react-native-modal";
import AutoHeightImage from "react-native-auto-height-image";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import axios from "../components/axios-instance.js";
import { endpoint } from "./props";

import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from "react-native-image-picker";
import Config from "react-native-config";
import stringoflanguages from './lang';

const win = Dimensions.get("window");
const styles = {
  item: {
    marginVertical: 5
  }
};

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFinishedProblems: false,
      user: {},
      isLoading: true,
      tableRows: [],
      imageSource: [],
      openedImageSource: " ",
      isEditing: false,
      addingPhoto: false,
      selectedPhoto: {},
      profilePhoto: ""
    };
  }
  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  async componentDidMount() {
    let id;
    try {
      id = await AsyncStorage.getItem("id");
    } catch (err) {
      console.warn(err.message);
    }
    axios
      .get(Config.BACKEND_URL + "/climber/" + id)
      .then( async (responseJson) => {
        const profilePic = responseJson.data.profilePicPath;
        this.setState({
          user: responseJson.data,
          isLoading: false,
          tableRows: responseJson.data.myProblems.filter(problem => {
            return problem.finished === false;
          }),
          imageSource: responseJson.data.myImages.map((uri, index) => {
            return {
              id: index,
              src: Config.BACKEND_URL + "/picture/images_" + id + "/" + uri
            };
          }),
          profilePhoto: profilePic === null ? Config.BACKEND_URL + "/picture/default.png" : Config.BACKEND_URL + "/picture/images_" + id + "/" + profilePic
        });
        console.log(this.state.tableRows);
      })
      .catch(error => {
        console.warn("user details: " + error.message);
      });
  }

  updateUser() {
    axios
      .put(
        Config.BACKEND_URL + "/climber/" + this.state.user.id,
        this.state.user,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .catch(error => {
        console.warn(error.message);
      });
  }

  finishProject(index) {
    let updatedUser = this.state.user;
    updatedUser.myProblems[index].finished = true;
    this.setState({ user: updatedUser });
    this.updateUser();
  }

  changeAttempts(index, change) {
    let updatedUser = this.state.user;
    updatedUser.myProblems[index].attempts =
      updatedUser.myProblems[index].attempts + change >= 0
        ? updatedUser.myProblems[index].attempts + change
        : 0;
    this.setState({ user: updatedUser });
    this.updateUser();
  }

  applyFilterFinished() {
    if (!this.state.showFinishedProblems) {
      this.setState({
        showFinishedProblems: !this.state.showFinishedProblems,
        tableRows: this.state.user.myProblems
      });
    } else {
      this.setState({
        showFinishedProblems: !this.state.showFinishedProblems,
        tableRows: this.state.user.myProblems.filter(problem => {
          return problem.finished === false;
        })
      });
    }
  }

  deleteProblem(index) {
    let updatedUser = this.state.user;
    updatedUser.myProblems = updatedUser.myProblems.splice(index, 1);
    this.setState({ user: updatedUser, tableRows: updatedUser.myProblems });
    this.updateUser();
  }

  _keyExtractor = (item, index) => {console.log(item); item.problem.id.toString();}

  renderImageThumbnail(item, itemSize, itemPaddingHorizontal) {
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          width: itemSize,
          height: itemSize,
          paddingHorizontal: itemPaddingHorizontal
        }}
        onPress={() => {
          this.setState({ openedImageSource: item.src });
        }}
      >
        <Image
          resizeMode="cover"
          style={{ flex: 1 }}
          source={{ uri: item.src }}
        />
      </TouchableOpacity>
    );
  }
  addPhoto() {
    ImagePicker.launchImageLibrary({ noData: true }, response => {
      this.setState({
        addingPhoto: true,
        selectedPhoto: response
      });
    });
  }

  async uploadPhoto() {
    const formData = new FormData();

    formData.append("file", {
      uri: this.state.selectedPhoto.uri,
      name: this.state.selectedPhoto.fileName,
      type: this.state.selectedPhoto.type
    });
    const id = await AsyncStorage.getItem("id"); 
    axios
      .post(
        Config.BACKEND_URL + "/picture/upload/climber/" +
          id,
        formData
      )
      .then(res => {
        if (res.data !== "Upload failed") {
          this.setState(prevState => ({
            imageSource: [...prevState.imageSource, {id:prevState.imageSource.length,
              src: Config.BACKEND_URL + "/picture/images_" + id + "/" + res.data}],
              addingPhoto: false
          }));
          Toast.show({
            text: `${stringoflanguages.picAdded}`,
            buttonText: "Ok",
            type: "success"
          });
        }
      })
      .catch(err => console.warn(err.message));
  }

  setProfilePicture()
  {
    var new_user = this.state.user;
    const words = this.state.openedImageSource.split('/');
    new_user.profilePicPath = words[words.length - 1];
    this.setState({
      profilePhoto: this.state.openedImageSource,
      user: new_user
    });
    this.updateUser();
    this.setState({openedImageSource: " "});
  }

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
            {this.state.isLoading ? (
              <LoadingPage />
            ) : (
              <Content
                contentContainerStyle={{
                  flex: 1,
                  heigth: "100%",
                  width: "100%",
                  backgroundColor: material.brandDark
                }}
              >
                <HideWithKeyboard style={{ width: "100%", heigth: "100%" }}>
                  <ImageBackground
                    source={{uri: this.state.profilePhoto}}
                    style={{
                      height: win.height * 0.4,
                      justifyContent: "flex-end"
                    }}
                  >
                    <LinearGradient
                      colors={["transparent", material.brandDark]}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                      }}
                      locations={[0.1, 1]}
                    />
                    <Text
                      style={{
                        color: material.brandLight,
                        margin: "2%",
                        marginBottom: 0,
                        fontSize: 24
                      }}
                    >
                      {this.state.user.nickname}
                    </Text>
                    <Text
                      style={{
                        color: material.brandLight,
                        margin: "2%",
                        marginTop: 0,
                        fontSize: 16
                      }}
                    >
                      {this.state.user.status}
                    </Text>
                  </ImageBackground>
                </HideWithKeyboard>
                <Tabs
                  style={{
                    flex: 1,
                    height: "100%",
                    width: "100%"
                  }}
                >
                  <Tab
                    heading={
                      <TabHeading>
                        <Text>`${stringoflanguages.personalData}`</Text>
                      </TabHeading>
                    }
                    style={{ flex: 1, height: "100%", width: "100%" }}
                  >
                    {this.state.isEditing ? (
                      <ScrollView>
                        <Item floatingLabel underline style={styles.item}>
                          <Label>`${stringoflanguages.nick}`</Label>
                          <Input
                            name="nickname"
                            onChangeText={text =>
                              this.setState(prevState => ({
                                user: {
                                  ...prevState.user,
                                  nickname: text
                                }
                              }))
                            }
                            value={this.state.user.nickname}
                            style={{ color: "#fff" }}
                          />
                        </Item>
                        <Item floatingLabel underline style={styles.item}>
                          <Label>Status</Label>
                          <Input
                            name="status"
                            onChangeText={text =>
                              this.setState(prevState => ({
                                user: {
                                  ...prevState.user,
                                  status: text
                                }
                              }))
                            }
                            value={this.state.user.status}
                            style={{ color: "#fff" }}
                          />
                        </Item>
                        <Item floatingLabel underline style={styles.item}>
                          <Label>`${stringoflanguages.name}`</Label>
                          <Input
                            name="name"
                            onChangeText={text =>
                              this.setState(prevState => ({
                                user: {
                                  ...prevState.user,
                                  name: text
                                }
                              }))
                            }
                            value={this.state.user.name}
                            style={{ color: "#fff" }}
                          />
                        </Item>
                        <Item floatingLabel underline style={styles.item}>
                          <Label>`${stringoflanguages.age}`</Label>
                          <Input
                            name="age"
                            onChangeText={text =>
                              this.setState(prevState => ({
                                user: {
                                  ...prevState.user,
                                  age: isNaN(parseInt(text, 10))
                                    ? ""
                                    : parseInt(text, 10)
                                }
                              }))
                            }
                            value={this.state.user.age.toString()}
                            style={{ color: "#fff" }}
                          />
                        </Item>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignContent: "center",
                            borderBottomColor: material.brandLight,
                            borderBottomWidth: 1,
                            height: 50
                          }}
                        >
                          <Text>`${stringoflanguages.male}`</Text>
                          <CheckBox
                            value={this.state.user.sex === "M"}
                            onValueChange={text =>
                              this.setState(prevState => ({
                                user: {
                                  ...prevState.user,
                                  sex: "F"
                                }
                              }))
                            }
                          />
                          <Text>`${stringoflanguages.female}`</Text>
                          <CheckBox
                            value={this.state.user.sex === "F"}
                            onValueChange={text =>
                              this.setState(prevState => ({
                                user: {
                                  ...prevState.user,
                                  sex: "F"
                                }
                              }))
                            }
                          />
                        </View>
                        <Item floatingLabel underline style={styles.item}>
                          <Label>`${stringoflanguages.mostDifficult}`</Label>
                          <Input
                            name="grade"
                            onChangeText={text =>
                              this.setState(prevState => ({
                                user: {
                                  ...prevState.user,
                                  grade: text
                                }
                              }))
                            }
                            value={this.state.user.grade}
                            style={{ color: "#fff" }}
                          />
                        </Item>
                        <Item floatingLabel underline style={styles.item}>
                          <Label>`${stringoflanguages.contact}`</Label>
                          <Input
                            name="contact"
                            onChangeText={text =>
                              this.setState(prevState => ({
                                user: {
                                  ...prevState.user,
                                  contact: text
                                }
                              }))
                            }
                            value={this.state.user.contact}
                            style={{ color: "#fff" }}
                          />
                        </Item>
                        <Item floatingLabel underline style={styles.item}>
                          <Label>`${stringoflanguages.aboutMe}`</Label>
                          <Textarea
                            rowSpan={5}
                            onChangeText={text =>
                              this.setState(prevState => ({
                                user: {
                                  ...prevState.user,
                                  bio: text
                                }
                              }))
                            }
                            value={this.state.user.bio}
                          />
                        </Item>
                        <Button
                          dark
                          style={{ alignSelf: "center" }}
                          onPress={() => {
                            this.updateUser();
                            this.setState({ isEditing: false });
                          }}
                        >
                          <Text>`${stringoflanguages.saveChanges}`</Text>
                        </Button>
                      </ScrollView>
                    ) : (
                      <ScrollView>
                        <Button
                          dark
                          onPress={() => this.setState({ isEditing: true })}
                          style={{
                            marginRight: 15,
                            marginTop: 15,
                            alignSelf: "center"
                          }}
                        >
                          <Text>`${stringoflanguages.editProfile}`</Text>
                        </Button>
                        <List>
                          <ListItem>
                            <Text>`${stringoflanguages.name}: `</Text>
                            <Text>{this.state.user.name}</Text>
                          </ListItem>
                          <ListItem>
                            <Text>`${stringoflanguages.age}: `</Text>
                            <Text>{this.state.user.age}</Text>
                          </ListItem>
                          <ListItem>
                            <Text>`${stringoflanguages.sex}: `</Text>
                            <Text>
                              {this.state.user.sex == "M" ? "Muž" : "Žena"}
                            </Text>
                          </ListItem>
                          <ListItem>
                            <Text>`${stringoflanguages.mostDifficult}: `</Text>
                            <Text>{this.state.user.grade}</Text>
                          </ListItem>
                          <ListItem>
                            <Text>`${stringoflanguages.contact}: `</Text>
                            <Text>{this.state.user.contact}</Text>
                          </ListItem>
                          <ListItem>
                            <Text>`${stringoflanguages.aboutMe}: `</Text>
                            <Text>{this.state.user.bio}</Text>
                          </ListItem>
                        </List>
                      </ScrollView>
                    )}
                  </Tab>
                  <Tab
                    heading={
                      <TabHeading>
                        <Text style={{ textAlign: "center" }}>`${stringoflanguages.myPhotos}`</Text>
                      </TabHeading>
                    }
                    style={{ flex: 1, height: "100%", width: "100%" }}
                  >
                    <ScrollView>
                      <Button
                        onPress={() => this.addPhoto()}
                        dark
                        style={{ alignSelf: "center", margin: 5 }}
                      >
                        <Text>`${stringoflanguages.addPhoto}`</Text>
                      </Button>
                      <PhotoGrid
                        data={this.state.imageSource}
                        itemsPerRow={2}
                        itemMargin={1}
                        itemPaddingHorizontal={1}
                        renderItem={this.renderImageThumbnail.bind(this)}
                      />
                      <Modal
                        isVisible={this.state.addingPhoto}
                        onModalHide={() => this.setState({ selectedPhoto: {} })}
                        style={{ marginLeft: 10, marginRight: 10 }}
                      >
                        <ScrollView
                          contentContainerStyle={{
                            width: win.width - 20,
                            backgroundColor: material.brandDark,
                            justifyContent: "center",
                            borderRadius: 10
                          }}
                        >
                          <AutoHeightImage
                            source={{ uri: this.state.selectedPhoto.uri }}
                            width={win.width - 40}
                            style={{ margin: 10 }}
                          />
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-around",
                              margin: 25
                            }}
                          >
                            <Button dark onPress={() => this.uploadPhoto()}>
                              <Text>`${stringoflanguages.add}`</Text>
                            </Button>
                            <Button
                              dark
                              onPress={() => {
                                this.setState({
                                  addingPhoto: false
                                });
                              }}
                            >
                              <Text>`${stringoflanguages.cancel}`</Text>
                            </Button>
                          </View>
                        </ScrollView>
                      </Modal>

                      <Modal
                        isVisible={this.state.openedImageSource != " "}
                        onBackdropPress={() =>
                          this.setState({ openedImageSource: " " })
                        }
                        style={{ flex: 1, margin: 0, justifyContent:"center"}}
                      >
                      <ScrollView contentContainerStyle={{backgroundColor:"transparent"}}>
                      <View style={{backgroundColor:"transparent", flexDirection:"row", justifyContent:"space-around", margin:10}}>
                        <Button transparent><Text style={{color: material.brandLight}} onPress={() => this.setProfilePicture()}>Nastav ako profilovú fotku</Text></Button><Icon onPress={() => this.setState({ openedImageSource: " " })} type="FontAwesome" name="times" style={{color:material.brandLight}}/>
                      </View>
                        <AutoHeightImage
                          source={{ uri: this.state.openedImageSource }}
                          width={win.width}
                        />
                      </ScrollView>
                      </Modal>
                    </ScrollView>
                  </Tab>
                  <Tab
                    heading={
                      <TabHeading>
                        <Text style={{ textAlign: "center" }}>
                        `${stringoflanguages.myProblems}`
                        </Text>
                      </TabHeading>
                    }
                  >
                    <ScrollView>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          margin: "3%"
                        }}
                      >
                        <Text>`${stringoflanguages.showFinished}`</Text>
                        <CheckBox
                          value={this.state.showFinishedProblems}
                          onValueChange={this.applyFilterFinished.bind(this)}
                        />
                      </View>
                      <FlatList
                        extraData={this.state}
                        data={this.state.tableRows}
                        keyExtractor={this._keyExtractor}
                        renderItem={({ item, index }) => (
                          <View>
                            {item.finished ? (
                              <CardItem
                                button
                                style={{
                                  backgroundColor: "#2ecc71",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  flex: 1,
                                  padding: "3%",
                                  alignContent: "center",
                                  borderColor: material.brandDark,
                                  borderBottomWidth: 2
                                }}
                              >
                                <View
                                  style={{
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "40%"
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: material.brandLight
                                    }}
                                  >
                                    {index + 1}.
                                  </Text>
                                  <Text style={{ color: material.brandLight }}>
                                    {item.problem.grade}
                                  </Text>
                                  <Text style={{ color: material.brandLight }}>
                                    {item.problem.sector}
                                  </Text>
                                </View>
                              </CardItem>
                            ) : (
                              <CardItem
                                button
                                style={{
                                  backgroundColor: material.brandLight,
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  flex: 1,
                                  padding: "3%",
                                  alignContent: "center",
                                  borderColor: material.brandDark,
                                  borderBottomWidth: 2
                                }}
                              >
                                <View
                                  style={{
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "40%"
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: material.brandDark
                                    }}
                                  >
                                    {index + 1}.
                                  </Text>
                                  <Text style={{ color: material.brandDark }}>
                                    {item.problem.grade}
                                  </Text>
                                  <Text style={{ color: material.brandDark }}>
                                    {item.problem.sector}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    width: "35%",
                                    textAlign: "center"
                                  }}
                                >
                                  <Icon
                                    onPress={this.changeAttempts.bind(
                                      this,
                                      index,
                                      -1
                                    )}
                                    style={{
                                      color: material.brandDark,
                                      paddingLeft: 10
                                    }}
                                    type="FontAwesome"
                                    name="minus"
                                  />
                                  <Text
                                    style={{
                                      color: material.brandDark
                                    }}
                                  >
                                    {item.attempts}
                                  </Text>
                                  <Icon
                                    onPress={this.changeAttempts.bind(
                                      this,
                                      index,
                                      1
                                    )}
                                    style={{
                                      color: material.brandDark
                                    }}
                                    type="FontAwesome"
                                    name="plus"
                                  />
                                </View>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    width: "19%"
                                  }}
                                >
                                  <Icon
                                    onPress={this.finishProject.bind(
                                      this,
                                      index
                                    )}
                                    style={{ color: material.brandDark }}
                                    type="FontAwesome"
                                    name="check"
                                  />
                                  <Icon
                                    onPress={this.deleteProblem.bind(
                                      this,
                                      index
                                    )}
                                    style={{ color: material.brandDark }}
                                    type="FontAwesome5"
                                    name="trash-alt"
                                  />
                                </View>
                              </CardItem>
                            )}
                          </View>
                        )}
                      />
                    </ScrollView>
                  </Tab>
                </Tabs>
              </Content>
            )}
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}
