import React from 'react';
import { ActivityIndicator } from 'react-native';
import {  Text, ListView, Image, View, Button, Title, Icon, Row } from '@shoutem/ui';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { userChanged } from '../actions';
import axios from 'axios';
import MovieDetailsScreen from './MovieDetailsScreen';

const image_path = 'http://image.tmdb.org/t/p/original'

class WatchlistScreen extends React.Component {
  static navigationOptions = {
    title: 'Watchlist'
  };

  constructor(props){
    super(props);
    this.state = {
      movieList: []
    }
  }

  componentDidMount(){
     axios.get(`http://localhost:3000/profile/${this.props.user.user.key}/watchlist`)
       .then(res => {
         const movieList = res.data.results;
         this.setState({movieList});
       })
  }

  renderRow(movieList){
    const { headerTextStyle} = styles;
    return (
      <View style={styles.rowCard}>
        <Image
          styleName="medium-square"
          source={{uri: image_path + movieList.poster_path}}
        />
        <View style={{ flex: 1, marginHorizontal: 8}}>
          <Title style={{marginVertical: 4}}>{movieList.original_title}
          </Title>
          <Text style={headerTextStyle}>{movieList.releaseDate}</Text>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginVertical: 5 }}>
          <Button style={styles.smallButton}><Icon name="checkbox-on" /></Button>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { movieList } = this.state;
    if(movieList.length === 0){
      return (
        <Row style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </Row>
      );
    }
    return(
      <ListView
        data={movieList}
        renderRow={this.renderRow}
      />
    )
  }
}

const styles = {
  rowCard: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  headerTextStyle: {
    fontSize: 18
  },
  smallButton: {
    paddingHorizontal: 5
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

const WatchlistStack = StackNavigator({
  Watchlist: { screen: connect(mapStateToProps, { userChanged })(WatchlistScreen)},
  MovieDetails: { screen: MovieDetailsScreen },
});

export default WatchlistStack;
