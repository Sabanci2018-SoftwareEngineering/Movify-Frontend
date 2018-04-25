import React from 'react';
import { Dimensions, TouchableOpacity, Platform, StatusBar, ActivityIndicator } from 'react-native';
//IMPORTANT REMINDER: View should be imported from @shoutem/ui
//If view is imported from react-native, shoutem components may have styling bugs
import { View, ScrollView, ListView, NavigationBar, Screen, Title, Image, Subtitle, Row, Tile, ImageBackground, Text, } from '@shoutem/ui';

import axios from 'axios';

//redux stuff
import { connect } from 'react-redux';
import { userChanged } from '../actions';

console.disableYellowBox = true;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class ProfilePage extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
      userWatchlist: undefined,
      recentLikedMovieImage: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png',
      mockData: [
        {
          "name": "Gaspar Brasserie",
          "address": "185 Sutter St, San Francisco, CA 94109",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
        },
        {
          "name": "Chalk Point Kitchen",
          "address": "527 Broome St, New York, NY 10013",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Sushi Academy",
          "address": "1900 Warner Ave. Unit A Santa Ana, CA",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-4.jpg" },
        },
        {
          "name": "Sushibo",
          "address": "35 Sipes Key, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        },
        {
          "name": "Mastergrill",
          "address": "550 Upton Rue, San Francisco, CA 94109",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-6.jpg" },
        }
      ]
    };

    this.renderRow = this.renderRow.bind(this);
  }
  
  componentDidMount(){
    axios.get('http://localhost:3000/profile', { withCredentials: true })
    .then((response) => {
      this.setState({userData: response.data.results});
    })
    .catch((error) => {
      console.log(error.response);
    });

    axios.get('http://localhost:3000/watchlist', { withCredentials: true })
    .then((response) => {
      this.setState({userWatchlist: response.data.results});
    })
    .catch((error) => {
      console.log(error.response);
    });
  }

  renderRow(rowData) {
      return (
        <TouchableOpacity onPress={() => console.log('Here we will call navigation function to movie page')}>
          <Row styleName="small">
              <Image
                style={styles.movieImage}
                source={{ uri: rowData.moviePhotoUrl }}
              />
              <Text>{rowData.movieName}</Text>
          </Row>
        </TouchableOpacity>
      );
  }
  
  render() {
     const { userData, userWatchlist } = this.state;
     if(userData === undefined || userWatchlist === undefined){
      return (
        <Row style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </Row>
      );
     }
     return (
       <Screen style={styles.container}>
          <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : (StatusBar.currentHeight || 0) }}>
            <NavigationBar 
            title={(userData.username).toUpperCase()} styleName="inline" 
            style={{ container: { height: (Platform.OS === 'ios' ? height / 12 : height / 15) } }} 
            />
          </View>
          {/* marginBottom is for overlapping of bottom navigation bar and scrollview */}
          <ScrollView style={{ marginBottom: 41 }} >
            <ImageBackground 
            styleName="large-banner"
            blurRadius={10}
            source={{ uri: this.state.recentLikedMovieImage }}
            >
              <Tile>
                <Image
                styleName="medium-avatar"
                style={{ marginTop: 5 }}
                source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png' }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginRight: width / 5, alignItems: 'center' }}>
                    <Title style={{ color: 'white' }}> Followers </Title>
                    <Subtitle style={{ color: 'white' }}> 99 </Subtitle>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Title style={{ color: 'white' }}> Following </Title>
                    <Subtitle style={{ color: 'white' }}> 68 </Subtitle>
                  </View>
                </View>
              </Tile>
            </ImageBackground>
            <ListView
            //change data with this.props.searchData.searchData when backend is ready
            data={this.state.mockData}
            renderRow={(rowData) => this.renderRow(rowData)}
            //Don't remove.It is for this bug --> https://github.com/facebook/react-native/issues/1831
            removeClippedSubviews={false}
            />
          </ScrollView>
       </Screen>
     );
  }
}

//These two functions are for movieImage styling
const window = Dimensions.get('window');
function getSizeRelativeToReference(dimension, originalRefVal, actualRefVal) {
  return (dimension / originalRefVal) * actualRefVal;
}

function dimensionRelativeToIphone(dimension, actualRefVal = window.width) {
  // 375 is iPhone width
  return getSizeRelativeToReference(dimension, 375, actualRefVal);
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  movieImage: {
    width: dimensionRelativeToIphone(45),
    height: dimensionRelativeToIphone(45),
    borderRadius: Platform.OS === 'ios' ? 20 : 50,
    borderWidth: 0,
  },
};

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps, { userChanged })(ProfilePage);