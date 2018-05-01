import React from 'react';
import { AsyncStorage } from 'react-native';
import { ListView, Text, Image, Title, Caption, View, Icon, Button } from '@shoutem/ui';
import { connect } from 'react-redux';

import { userChanged } from '../actions';
import { StackNavigator } from 'react-navigation';
import MovieDetailsScreen from './MovieDetailsScreen';

import axios from 'axios';

let user;
// This hardcoded path will be fixed when we implement singleton network object.
const image_path = 'http://image.tmdb.org/t/p/original'
class HomeScreen extends React.Component {
  state = {
    titles: [
      { "id": 27205, original_title: "Inception", poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg", release_date: "2010-07-14", overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious." },
      { "id": 27206, original_title: "Bald", poster_path: "/jUKFcsIL3WllT2AkWv4msOweJ42.jpg", release_date: "2008-01-01", overview:"BALD is the tale of Andrew Wood, a second year university student whose grades are receding faster than his hairline. He hits rock bottom when he finds out that hes been kicked out of school. In an effort to increase his own self esteem and erase his insecurity about losing his hair, Andrew and his best friend Max start an online internet business with all of the girls at college." },
      { "id": 27207, original_title: "Bloodsucking Pharaohs in Pittsburgh", poster_path: "/2Hp0DHqObkKOuRweeTlJr7i9xaY.jpg", release_date: "1991-05-02", overview: "Two cops and a detective's daughter go after a chainsaw killer." },
      { "id": 27208, original_title: "Un lever de rideau", poster_path: "/83rxCh3KD7as0nBJfv2Ls3esteM.jpg", release_date: "2006-08-07", overview: "Bruno, a young Frenchman, is frustated by his girlfriend's constant lack of punctuality. He decides to end their relationship the next time she is again late." }
    ]
  }
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props){
    super(props);
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
          .then((response) => {
            //console.log(response);
          })
          .catch((error) => {
            console.log(error.response);
          });

      });
    } catch(error){
      console.log(error);
    }
  }

  renderRow(oneTitle){
    return (
        <View style={styles.rowCard}>
          <Image
            styleName="medium-square"
            source={{uri: image_path + oneTitle.poster_path}}
          />
          <View style={{ flex: 1, marginHorizontal: 8}}>
            <Title style={{marginVertical: 4}}>{oneTitle.original_title}</Title>
            <Text numberOfLines={3}>{oneTitle.overview}</Text>
            <Caption style={{marginVertical: 4}}>{oneTitle.release_date}</Caption>
            <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginVertical: 5 }}>
              <Button style={styles.smallButton}><Icon name="share" /></Button>
              <Button style={styles.smallButton}><Icon name="add-to-favorites-off" /></Button>
              <Button style={styles.smallButton}><Icon name="checkbox-on" /></Button>
            </View>
          </View>
        </View>
    );
  }

  render() {
    const titles = this.state.titles
    return (
        <ListView
          data={titles}
          renderRow={this.renderRow}
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
