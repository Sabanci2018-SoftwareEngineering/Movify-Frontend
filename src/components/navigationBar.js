import React, { Component } from 'react';
import { View } from 'react-native';

import Tabbar from 'react-native-tabbar-bottom';

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
          //           {
          //   // if you are using react-navigation just pass the navigation object in your components like this:
          //   // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
          // }
          // {this.state.page === "HomeScreen" && <Text>Screen1</Text>}
          // {this.state.page === "NotificationScreen" && <Text>Screen2</Text>}
          // {this.state.page === "ProfileScreen" && <Text>Screen3</Text>}
          // {this.state.page === "ChatScreen" && <Text>Screen4</Text>}
          // {this.state.page === "SearchScreen" && <Text>Screen5</Text>}
          stateFunc={(tab) => {
            this.setState({ page: tab.page });
            this.props.navigation.setParams({tabTitle: tab.title})
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
