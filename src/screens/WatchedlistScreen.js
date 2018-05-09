import React from 'react';
import { ActivityIndicator } from 'react-native';
import {  Text, ListView, Image, View, Button, Title, Icon, Row } from '@shoutem/ui';

import axios from 'axios';
import { StackNavigator } from 'react-navigation';

import NetworkAccess from '../common/NetworkAccess';
import { connect } from 'react-redux';
import { userChanged } from '../actions';
import MovieDetailsScreen from './MovieDetailsScreen';
import NavigationBar from '../components/navigationBar';

const image_path = 'http://image.tmdb.org/t/p/original'

class WatchedlistScreen extends React.Component {
    static navigationOptions = {
      title: 'Watched'
    };

  constructor(props){
    super(props);
    this.state = {
      movieList: undefined
    }
  }

  static navigationOptions = {
    title: 'Watched'
  };

  componentDidMount(){
    NetworkAccess.getUserWatched(this.props.user.user.key, (list) =>{
      this.setState({movieList: list});
    });
  }

  renderRow(movieList){
    return (
      <View style={styles.rowCard}>
        <Image
          styleName="medium-square"
          source={{uri: image_path + movieList.poster_path}}
        />
        <View style={{ flex: 1, marginHorizontal: 8}}>
          <Title
          style={{marginVertical: 4}}>{movieList.original_title}
          </Title>
          <Text>{movieList.releaseDate}</Text>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginVertical: 5 }}>
            <Button style={styles.smallButton}><Icon name="checkbox-on" /></Button>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { movieList } = this.state;
    if(movieList === undefined){
      return (
        <Row style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </Row>
      );
    }
    return(
      <View>
         <NavigationBar
        navigation={this.props.navigation}
        title={'Watched'}
        type={'JustTitle'}
        />
        <ListView
          data={this.state.movieList}
          renderRow={this.renderRow}
        />
      </View>
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

const WatchedlistStack = StackNavigator({
  Watched: { screen: connect(mapStateToProps, { userChanged })(WatchedlistScreen)},
  MovieDetails: { screen: MovieDetailsScreen },
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

export default WatchedlistStack;
