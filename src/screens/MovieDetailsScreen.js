import React from 'react';
import { View, Text, Button } from '@shoutem/ui';
import { connect } from 'react-redux';

import { usernameChanged } from '../actions';

class MovieDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Movie Details Screen
        </Text>
        <Text>Username is:
        {this.props.username !== undefined ?
        this.props.username.username : 'User is undefined.'} </Text>
        <Button
        styleName="secondary" style={{ marginTop: 20 }}
        onPress={() => this.props.navigation.navigate('Home')}
        >
        <Text>Click here to navigate home page</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { username } = allReducers;
  return { username };
};

export default connect(mapStateToProps, { usernameChanged })(MovieDetailsScreen);
