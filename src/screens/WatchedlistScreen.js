import React from 'react';
import { View, Text } from '@shoutem/ui';

class WatchedlistScreen extends React.Component {
  static navigationOptions = {
    title: 'Watched',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Watchedlist Screen</Text>
      </View>
    );
  }
}

export default WatchedlistScreen;
