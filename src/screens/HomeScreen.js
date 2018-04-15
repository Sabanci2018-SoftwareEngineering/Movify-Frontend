import React from 'react';
import { View, Text, Button } from '@shoutem/ui';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Profile')}
          >
          <Text>Go to Profile Example</Text>
        </Button>
      </View>
    );
  }
}

export default HomeScreen;
