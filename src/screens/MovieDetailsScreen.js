import React from 'react';
import { View, Image, Text, Button, Subtitle, ListView } from '@shoutem/ui';
import { connect } from 'react-redux';
import axios from 'axios';

import { usernameChanged } from '../actions';

const image_path = 'http://image.tmdb.org/t/p/original'
const testCast = [
  {name: "Brad Pitt", movieName: "Movie Name", imageUri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png'},
  {name: "Other Guy", movieName: "Movie Name Of Other Guy", imageUri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png'},
  {name: "Fat Guy", movieName: "Fat Guy With Glasses", imageUri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-11.png'}
]

class MovieDetailsScreen extends React.Component {
  state = {}


  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.movieName : 'Details',
    }
  };

  componentDidMount(){
    const { params } = this.props.navigation.state;
    axios.get(`https://movify.monus.me/title/${params.movieId}`)
      .then(res => {
        const movie = res.data.results;
        this.setState(movie);
      })
  }

  renderRow(person){
    return(
      <View style={{flexDirection: 'row'}}>
        <Image
          styleName="small"
          source={{uri: person.imageUri}}
        />
        <View styleName="horizontal v-center space-around">
          <Subtitle styleName="md-gutter-right">{person.name}</Subtitle>
          <Subtitle styleName="md-gutter-right">|</Subtitle>
          <Subtitle styleName="md-gutter-left">{person.movieName}</Subtitle>
        </View>
      </View>
    )
  }

  render() {
     return (
      <View>
        <View style={{flexDirection: 'row'}}>
        <Image
          styleName="medium-square"
          source={{uri: image_path + this.state.poster_path}}
        />
          <View>
            <Text>{this.state.original_title}</Text>
            <Text>Rate: {this.state.vote_average}</Text>
            <Text>Duration: {this.state.runtime} min.</Text>
            <Button>
              <Text>Add to Watchlist</Text>
            </Button>
            <Button>
              <Text>Add to Watched</Text>
            </Button>
          </View>
        </View>

        <Text>{this.state.overview}</Text>

        <ListView
          data={testCast}
          renderRow={this.renderRow}
          />

      </View>
    );
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { username } = allReducers;
  return { username };
};

export default connect(mapStateToProps, { usernameChanged })(MovieDetailsScreen);
