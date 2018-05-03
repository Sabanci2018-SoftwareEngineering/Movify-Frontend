import React from 'react';
import {  Text, ListView, Image, View, Button, Title, Icon } from '@shoutem/ui';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';

import { connect } from 'react-redux';
import { userChanged } from '../actions';
import MovieDetailsScreen from './MovieDetailsScreen';
//const testResults = [
//  {title: 27205, release_date:"2015", original_title: "Inception", poster_path: "http://image.tmdb.org/t/p/original/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"},
//  {title: 27206, release_date:"2016", original_title: "Bald", poster_path: "http://image.tmdb.org/t/p/original/jUKFcsIL3WllT2AkWv4msOweJ42.jpg"},
//  {title: 27207, release_date:"2017", original_title: "Bloodsucking Pharaohs in Pittsburgh", poster_path: "http://image.tmdb.org/t/p/original/2Hp0DHqObkKOuRweeTlJr7i9xaY.jpg"},
//]
const image_path = 'http://image.tmdb.org/t/p/original'

class WatchedlistScreen extends React.Component {

  state= {movieList: []}

  static navigationOptions = {
    title: 'Watched'
  };

  componentDidMount(){
     const { params } = this.props.navigation.state;
     axios.get(`http://localhost:3000/profile/${this.props.user.user.key}/watched`)
       .then(res => {
         const movieList = res.data.results;
         this.setState({movieList});
       })
  }

    render() {

      return(
        <ListView
          data={this.state.movieList}
          renderRow={this.renderRow}
        />
      )

    }

      renderRow(movieList){
        const { headerTextStyle} = styles ;
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
});

export default WatchedlistStack;
