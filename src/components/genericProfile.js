import React from 'react';
import { Dimensions, Platform, StatusBar, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { View, ScrollView, ListView, NavigationBar, Screen, Title, Subtitle, Row, Tile, ImageBackground, Icon, Divider, Button} from '@shoutem/ui';

import axios from 'axios';

import FollowButton from './followButton';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class GenericProfile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
      userWatchlist: undefined
    };

    this.renderRow = this.renderRow.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.returnUserInfo = this.returnUserInfo.bind(this);
    this.returnNavigationBar = this.returnNavigationBar.bind(this);
  }

  getResponse(){
    const username = this.props.username;

    axios.get('http://localhost:3000/profile', {
      target_username: username,
      withCredentials: true,
    })
    .then((response) => {
      this.setState({userData: response.data.results});
      console.log(this.state.userData);
    })
    .catch((error) => {
      this.setState({userData: undefined});
    });

    axios.get(`http://localhost:3000/profile/${username}/watchlist`, {
      withCredentials: true
    })
    .then((response) => {
      this.setState({userWatchlist: response.data.results});
    })
    .catch((error) => {
      this.setState({userWatchlist: undefined});
    });

  }

  componentDidMount(){
    this.getResponse();
  }

  returnLeftComponent(type){
      if(type){
        return(
            <Button
            onPress={()=> this.props.navigation.pop()}
            >
              <Icon name="back" />
            </Button>
          );
      }
      else{
        return(
          <Button
          onPress={()=> this.props.navigation.goBack()}
          >
            <Icon name="settings" />
          </Button>
        );
      }
  }

  returnRightComponent(){
          return(
            <Button
            onPress={()=> console.log("Navigate to user search page")}
            >
              <Icon name="search" />
            </Button>
          );
  }

  returnNavigationBar(userData){
    return(
      <View style={styles.navigationBarView}>
        <NavigationBar
              title={(userData.username).toUpperCase()} styleName="inline"
              style={{ container: { height: (Platform.OS === 'ios' ? height / 12 : height / 15) }}}
              leftComponent={this.returnLeftComponent(this.props.type)}
              rightComponent={this.returnRightComponent()}
        />
      </View>
    );
  }

  returnUserInfo(userData){

    return(
      <ImageBackground
            styleName="large-banner"
            style={{ height: this.props.type ? height/3 : height/3.3 }}
            blurRadius={10}
            source={{ uri: "https://shoutem.github.io/img/ui-toolkit/examples/image-3.png"}}
            //We will show last watched movie poster as background image --> source={{ uri: this.state.data[0] !== undefined ? this.state.data[0].poster_path : "" }}
            >
              <Tile>
                <Image
                style={styles.userAvatar}
                source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png' }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('FollowList', {pageType: 'Followers', username: this.props.username})}>
                    <View style={styles.followersView}>
                      <Title style={styles.followText}> Followers </Title>
                      <Subtitle style={styles.followText}> {this.state.userData.followers} </Subtitle>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('FollowList', {pageType: 'Following', username: this.props.username})}>
                    <View style={styles.followingView}>
                      <Title style={styles.followText}> Following </Title>
                      <Subtitle style={styles.followText}> {this.state.userData.follows} </Subtitle>
                    </View>
                  </TouchableOpacity>
                </View>
                {this.props.type ? <FollowButton selected={false} /> : null}
              </Tile>
      </ImageBackground>
    );
  }

  renderRow(movie){
    return(
      <TouchableOpacity
      onPress={() => this.props.navigation.navigate('MovieDetails', {movieName: movie.original_title, movieId: movie.titleID})}
      >
      <Row>
        <Image
            style={styles.moviePoster}
            source={{ uri: 'http://image.tmdb.org/t/p/original' + movie.poster_path }}
        />
        <View style={styles.movieTitle}>
          <Subtitle>{movie.original_title}</Subtitle>
        </View>
        <Icon styleName="disclosure" name="right-arrow" />
      </Row>
      <Divider styleName="line" />
      </TouchableOpacity>
    )
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
          {this.returnNavigationBar(userData)}
          <ScrollView>
            {this.returnUserInfo(userData)}
            <ListView
            data={this.state.userWatchlist}
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


//Don't user StyleSheet.create(); It affects styling for some components so styling doesn't work properly
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
  navigationBarView: {
    paddingTop: Platform.OS === 'ios' ? 0 : (StatusBar.currentHeight || 0)
  },
  moviePoster: {
    borderRadius: 30,
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: 'transparent',
    marginRight: 10
  },
  movieTitle: {
    flexDirection: 'row'
  },
  userAvatar: {
    borderRadius: 60,
    height: 120,
    width: 120,
    borderWidth: 2,
    borderColor: 'rgba(34, 212, 118, 1)'
  },
  followersView: {
    marginRight: width / 10,
    alignItems: 'center'
  },
  followingView: {
    marginLeft: width / 10,
    alignItems: 'center'
  },
  followText: {
    color: 'white',
    fontFamily: 'Rubik-Regular'
  }
};
