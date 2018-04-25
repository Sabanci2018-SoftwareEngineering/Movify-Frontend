import React from 'react';
import { View, Text, Button } from '@shoutem/ui';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { userChanged } from '../actions';

import MovieDetailsScreen from './MovieDetailsScreen';

class WatchlistScreen extends React.Component {
  static navigationOptions = {
    title: 'Watchlist'
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
        styleName="secondary" style={{ marginTop: 20 }}
        onPress={() => this.props.navigation
          .navigate('MovieDetails', {movieName: "Inception", movieId: "27205"})}
        >
        <Text>Inception</Text>
        </Button>
      </View>
    );
  }
}
const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

const WatchlistStack = StackNavigator({
  Home: { screen: connect(mapStateToProps, { userChanged })(WatchlistScreen)},
  MovieDetails: { screen: MovieDetailsScreen },
});

export default WatchlistStack;
