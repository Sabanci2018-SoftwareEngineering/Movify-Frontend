import React from 'react';
import { Dimensions, Platform, StatusBar, ActivityIndicator, Image} from 'react-native';
import { View, ScrollView, ListView, NavigationBar, Screen, Title, Subtitle, Row, Tile, ImageBackground, Icon, Divider, Button} from '@shoutem/ui';

import axios from 'axios';

import { connect } from 'react-redux';
import { userChanged } from '../actions';

import { FollowButton } from '../components';

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
      data: [
        { "id": 27205, original_title: "Inception", poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg", release_date: "2010-07-14", overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious." },
        { "id": 27206, original_title: "Bald", poster_path: "/jUKFcsIL3WllT2AkWv4msOweJ42.jpg", release_date: "2008-01-01", overview:"BALD is the tale of Andrew Wood, a second year university student whose grades are receding faster than his hairline. He hits rock bottom when he finds out that hes been kicked out of school. In an effort to increase his own self esteem and erase his insecurity about losing his hair, Andrew and his best friend Max start an online internet business with all of the girls at college." },
        { "id": 27207, original_title: "Bloodsucking Pharaohs in Pittsburgh", poster_path: "/2Hp0DHqObkKOuRweeTlJr7i9xaY.jpg", release_date: "1991-05-02", overview: "Two cops and a detective's daughter go after a chainsaw killer." },
        { "id": 27208, original_title: "Un lever de rideau", poster_path: "/83rxCh3KD7as0nBJfv2Ls3esteM.jpg", release_date: "2006-08-07", overview: "Bruno, a young Frenchman, is frustated by his girlfriend's constant lack of punctuality. He decides to end their relationship the next time she is again late." }
      ]
    };

    this.renderRow = this.renderRow.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.returnUserInfo = this.returnUserInfo.bind(this);
    this.returnNavigationBar = this.returnNavigationBar.bind(this);
  }
  
  getResponse(){
    const username = this.props.user.user.key;

    axios.get('http://localhost:3000/profile', {
      target_username: username,
      withCredentials: true,
    })
    .then((response) => {
      this.setState({userData: response.data.results});
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

  renderRow(movie){
    return(
      <View>
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
      </View>
    )
  }

  returnNavigationBar(userData){
    return(
      <View style={styles.navigationBarView}>
        <NavigationBar 
              title={(userData.username).toUpperCase()} styleName="inline" 
              style={{ container: { height: (Platform.OS === 'ios' ? height / 12 : height / 15) }}} 
              rightComponent={
                <Button
                onPress={()=> console.log("Navigate to user search page")}
                >
                  <Icon name="search" />
                </Button>
              }
        />
      </View>
    );
  }

  returnUserInfo(userData){
    return(
      <ImageBackground 
            styleName="large-banner"
            style={{height: height/3}}
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
                  <View style={styles.followersView}>
                    <Title style={styles.followText}> Followers </Title>
                    <Subtitle style={styles.followText}> 99 </Subtitle>
                  </View>
                  <View style={styles.followingView}>
                    <Title style={styles.followText}> Following </Title>
                    <Subtitle style={styles.followText}> 68 </Subtitle>
                  </View>
                </View>
                <FollowButton selected={false} />
              </Tile>
      </ImageBackground>
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
          {this.returnNavigationBar(userData)}
          <ScrollView>
            {this.returnUserInfo(userData)}
            <ListView
            data={this.state.data}
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
    borderColor: 'rgba(253, 179, 43, 1)',
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
    fontFamily: 'regular'
  }
};

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps, { userChanged })(ProfilePage);