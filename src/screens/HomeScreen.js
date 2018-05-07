import React from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import { ListView, Text, Image, Title, Caption, View, Icon, Button, Row } from '@shoutem/ui';
import { connect } from 'react-redux';

import { userChanged } from '../actions';
import { StackNavigator } from 'react-navigation';
import MovieDetailsScreen from './MovieDetailsScreen';

import axios from 'axios';

let user;
// This hardcoded path will be fixed when we implement singleton network object.
const image_path = 'http://image.tmdb.org/t/p/original'
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props){
    super(props);
    this.state = {
        titles: [],
    }
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount(){
    try{
      AsyncStorage.getItem('user', (err, result) => {
        user = JSON.parse(result);
        this.props.userChanged({ user: user });

        //user logins again when app is opened because
        //it loses cookies when app is closed
        axios.post('http://localhost:3000/login', {
          key: user.key,
          password: user.password,
          })
      });
    } catch(error){
      console.log(error);
    }
    this.onRefresh()
  }

  onRefresh(){
    axios.get('http://localhost:3000/feed/100')
      .then((response) => {
        this.setState({titles: response.data.results})
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  renderRow(oneTitle){
    return (
        <View style={styles.rowCard}>
          <Image
            styleName="medium-square"
            source={{uri: image_path + oneTitle.poster_path}}
          />
          <View style={{ flex: 1, marginHorizontal: 8}}>
            <Title onPress={() => this.props.navigation
              .navigate('MovieDetails', {movieName: oneTitle.title, movieId: oneTitle.titleID})}
              style={{marginVertical: 4}}>{oneTitle.original_title}</Title>
            <Text numberOfLines={3}>{oneTitle.overview}</Text>
            <Caption style={{marginVertical: 4}}>{oneTitle.release_date}</Caption>
            <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginVertical: 5 }}>
              <Button style={styles.smallButton}><Icon name="share" /></Button>
              <Button onPress={() => axios.post('http://localhost:3000/profile/watchlist', {titleID: oneTitle.titleID})} style={styles.smallButton}><Icon name="add-to-favorites-off" /></Button>
              <Button onPress={() => axios.post('http://localhost:3000/profile/watched', {titleID: oneTitle.titleID})} style={styles.smallButton}><Icon name="checkbox-on" /></Button>
            </View>
          </View>
        </View>
    );
  }

  render() {
    const { titles } = this.state;
    if(titles !== undefined && titles.length === 0){
      return (
        <Row style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </Row>
      );
     }
    return (
        <ListView
          data={titles}
          renderRow={this.renderRow.bind(this)}
        />
    );
  }
}

const styles = {
  rowCard: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  smallButton: {
    paddingHorizontal: 5
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

const HomeStack = StackNavigator({
  Home: { screen: connect(mapStateToProps, { userChanged })(HomeScreen)},
  MovieDetails: { screen: MovieDetailsScreen },
});

export default HomeStack;
