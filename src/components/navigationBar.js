import React, { Component } from 'react';
import {StyleSheet, Text,View} from 'react-native';
import { Font, Components } from 'expo';

import Tabbar from 'react-native-tabbar-bottom';
import {Scene, Router, Modal, Actions} from 'react-native-router-flux';

export default class NavigationBar extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      loading: true,
      page: 'NewPage'
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
        return <Expo.AppLoading />;
      }
    return (
      <View>
        <Tabbar
          //When user clicks another tab, this function will be executed
          //It changes this.state.page and jumps to the page
          //Actions.jump is a function of react-native-router-flux
          stateFunc={(tab) => {
            this.setState({page: tab.page});
            Actions.jump(tab.page);
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: "NewPage",
              icon: "home",
            },
            {
              page: "NewPage2",
              icon: "notifications",
              badgeNumber: 11,
            },
            {
              page: "ProfilePage",
              icon: "person",
            },
            {
              page: "ChatScreen",
              icon: "chatbubbles",
              //badgeNumber: 7,
            },
            {
              page: "SearchPage",
              icon: "search",
            },
          ]}
        />
      </View>
    );
  }
}