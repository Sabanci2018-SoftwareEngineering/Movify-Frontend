import React from 'react';
import { View, Image, Text, Button, Row, ListView, Caption, Subtitle, Divider, Title, Icon, ScrollView } from '@shoutem/ui';
import { connect } from 'react-redux';
import axios from 'axios';

import { userChanged } from '../actions';

const image_path = 'http://image.tmdb.org/t/p/original'

class MovieDetailsScreen extends React.Component {
  state = {
    movie: {},
    cast: []
  }


  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.movieName : 'Details',
    }
  };

  componentDidMount(){
    const { params } = this.props.navigation.state;
    axios.get(`http://localhost:3000/title/${params.movieId}`)
      .then(res => {
        const movie = res.data.results;
        this.setState({movie});
      })

    axios.get(`http://localhost:3000/title/${params.movieId}/credits`)
      .then(res => {
        const cast = res.data.results;
        this.setState({...cast});
      })
  }

  renderRow(person){
    return(
      <View>
      <Row>
        <Image
          styleName="small-avatar"
          source={{ uri: image_path + person.profile_path }}
        />
        <View style={{ flexDirection: 'row' }}>
          <Subtitle>{person.name}</Subtitle>
          <Caption style={{marginLeft: 'auto'}}>{person.character}</Caption>
        </View>
      </Row>
      <Divider styleName="line" />
      </View>
    )
  }

  render() {
     return (
      <ScrollView style={{ marginVertical: 10, marginHorizontal: 10 }}>
        <View style={{flexDirection: 'row'}}>
        <Image
          styleName="medium-square"
          source={{uri: image_path + this.state.movie.poster_path}}
          style={{ marginRight: 10, marginBottom: 10 }}
        />
          <View>
            <Title style={styles.textStyle}>{this.state.movie.original_title}</Title>
            <Text style={styles.textStyle}>Rate: {this.state.movie.vote_average}</Text>
            <Text style={styles.textStyle}>Duration: {this.state.movie.runtime} min.</Text>
            <Text style={styles.textStyle}>Release: {this.state.movie.release_date}</Text>
            <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginVertical: 10 }}>
              <Button style={styles.smallButton}><Icon name="share" /></Button>
              <Button onPress={() => axios.post('http://localhost:3000/profile/watchlist', {titleID: this.props.navigation.state.params.movieId})} style={styles.smallButton}><Icon name="add-to-favorites-off" /></Button>
              <Button onPress={() => axios.post('http://localhost:3000/profile/watched', {titleID: this.props.navigation.state.params.movieId})} style={styles.smallButton}><Icon name="checkbox-on" /></Button>
            </View>
          </View>
        </View>

        <Text style={{marginVertical: 15, marginHorizontal: 10}}>{this.state.movie.overview}</Text>
        <Title style={{marginBottom: 15}}>Actors</Title>
        <ListView
          data={this.state.cast}
          renderRow={this.renderRow}
          initialNumToRender={5}
          />

      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    marginVertical: 3
  },
  smallButton: {
    paddingHorizontal: 5
  }
}
const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps, { userChanged })(MovieDetailsScreen);
