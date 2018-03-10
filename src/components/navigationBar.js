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
      <View style={styles.container}>
        {
          // if you are using react-navigation just pass the navigation object in your components like this:
          // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
        }

        <Tabbar
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
              page: "ProfileScreen",
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

const styles = StyleSheet.create({
  container: {
    //
  }
});