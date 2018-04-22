import React from 'react';
import { View, Image, Text } from '@shoutem/ui';
import { connect } from 'react-redux';

import { usernameChanged } from '../actions';

const testMovieJson = {
  "adult": false,
  "backdrop_path": "/s2bT29y0ngXxxu2IA8AOzzXTRhd.jpg",
  "belongs_to_collection": null,
  "budget": 160000000,
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 12,
      "name": "Adventure"
    }
  ],
  "homepage": "http://inceptionmovie.warnerbros.com/",
  "id": 27205,
  "imdb_id": "tt1375666",
  "original_language": "en",
  "original_title": "Inception",
  "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
  "popularity": 44.729096,
  "poster_path": "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
  "production_companies": [
    {
      "id": 923,
      "logo_path": "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png",
      "name": "Legendary Pictures",
      "origin_country": "US"
    },
    {
      "id": 9996,
      "logo_path": "/3tvBqYsBhxWeHlu62SIJ1el93O7.png",
      "name": "Syncopy",
      "origin_country": "GB"
    },
    {
      "id": 174,
      "logo_path": "/6rFNo5taSC9i0Sxnl81nucQMsw9.png",
      "name": "Warner Bros. Pictures",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "GB",
      "name": "United Kingdom"
    },
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2010-07-14",
  "revenue": 825532764,
  "runtime": 148,
  "spoken_languages": [
    {
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "Your mind is the scene of the crime.",
  "title": "Inception",
  "video": false,
  "vote_average": 8.2,
  "vote_count": 16926
};

class MovieDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.movieName : 'Details',
    }
  };

  render() {
    return (
      <View>
      <Image
        source={require('../temp-assets/inception-poster.jpg')}
      />
      <Text> Inception Movew </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { username } = allReducers;
  return { username };
};

export default connect(mapStateToProps, { usernameChanged })(MovieDetailsScreen);
