import React from 'react';
import { Dimensions, TouchableOpacity, Platform, StatusBar } from 'react-native';

import { View, ScrollView, ListView, NavigationBar, Screen, Title, Image, Subtitle, Row, Tile, ImageBackground, Text, } from '@shoutem/ui';

//IMPORTANT REMINDER: View should be imported from @shoutem/ui
//If view is imported from react-native, shoutem components may have styling bugs


//redux stuff
import { connect } from 'react-redux';
import { usernameChanged } from '../actions';

import Mock from '../../assets/mockData.json';

console.disableYellowBox = true;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class ProfilePage extends React.Component {
//---------------- CONSTRUCTOR --------------
  constructor(props) {
    super(props);
    this.state = {
      username: 'boraik',
      recentLikedMovieImage: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png',
      mockData: Mock
    };

    this.renderRow = this.renderRow.bind(this);
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
     return (
       <Screen style={styles.container}>
          <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : (StatusBar.currentHeight || 0) }}>
            <NavigationBar 
            title={(this.state.username).toUpperCase()} styleName="inline" 
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
  const { username } = allReducers;
  return { username };
};

export default connect(mapStateToProps, { usernameChanged })(ProfilePage);
