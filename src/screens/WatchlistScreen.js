import React from 'react';
import { View, Text, Button, TextInput } from '@shoutem/ui';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { usernameChanged } from '../actions';

import MovieDetailsScreen from './MovieDetailsScreen';

class WatchlistScreen extends React.Component {
  static navigationOptions = {
    title: 'Watchlist',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 10 }}> This is a new page starter. </Text>
        <TextInput
        placeholder={'This is a demo. Type the username'}
        onChangeText={
        (input) => this.props.usernameChanged({ username: input })
        }
        />
        <Text> {this.props.user !== undefined ?
        `Email:  ${this.props.user.user.email}` : 'User is undefined.'}
        </Text>
        <Button
        styleName="secondary" style={{ marginTop: 20 }}
        onPress={() => this.props.navigation.navigate('MovieDetails')}
        >
        <Text>Click here to navigate the other page</Text>
        </Button>
      </View>
    );
  }
}
const mapStateToProps = ({ allReducers }) => {
  const { username, user } = allReducers;
  return { username, user };
};

const WatchlistStack = StackNavigator({
  Home: { screen: connect(mapStateToProps, { usernameChanged })(WatchlistScreen)},
  MovieDetails: { screen: MovieDetailsScreen },
});

export default WatchlistStack;
