import React from 'react';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import {Container, Content, StyleProvider, Text, Item, Input, View} from 'native-base';
import {Image} from 'react-native';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
        email: "",
        password: ""
    };
  }

 handleChange = name => event => {
     this.setState({ [name]: event.target.value });
   };

   render() {

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
            <Content padder contentContainerStyle={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image source={require('./img/logo.png')} style={{width: '80%', resizeMode:'contain'}}/>
                <Text style={{marginBottom:'5%'}}>Login</Text>
                <Item underline>
                   <Input placeholder="Underline Textbox" />
                </Item>
                <Item underline>
                    <Input placeholder="Underline Textbox"/>
                </Item>
            </Content>
        </Container>
      </StyleProvider>
    );
  }
}

