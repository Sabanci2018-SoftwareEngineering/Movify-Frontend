import React, { Component } from 'react';
import { View } from 'react-native';

import Tabbar from 'react-native-tabbar-bottom';
import { Actions } from 'react-native-router-flux';

export default class NavigationBar extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      page: 'NewPage'
    };
  }

  render() {
    return (
      <View>
        <Tabbar
          //When user clicks another tab, this function will be executed
          //It changes this.state.page and jumps to the page
          //Actions.jump is a function of react-native-router-flux
          stateFunc={(tab) => {
            this.setState({ page: tab.page });
            Actions.jump(tab.page);
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: 'NewPage',
              icon: 'home',
            },
            {
              page: 'NewPage2',
              icon: 'notifications',
              badgeNumber: 11,
            },
            {
              page: 'ProfilePage',
              icon: 'person',
            },
            {
              page: 'ChatScreen',
              icon: 'chatbubbles',
              //badgeNumber: 7,
            },
            {
              page: 'SearchPage',
              icon: 'search',
            },
          ]}
        />
      </View>
    );
  }
}
