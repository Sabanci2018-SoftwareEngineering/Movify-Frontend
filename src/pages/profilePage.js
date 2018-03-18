import React from 'react';
import { StyleSheet,  ActivityIndicator, Dimensions, TouchableOpacity, Platform, StatusBar} from 'react-native';
import { Font, Components } from 'expo';

import { Heading,View, DropDownMenu,ListView, NavigationBar, Screen, Icon, Title, Examples, Card, Image, Subtitle, Caption, Button, Row, styleName, Tile, Overlay, ImageBackground, Text, TextInput, ScrollView} from '@shoutem/ui';

//IMPORTANT REMINDER: View should be imported from @shoutem/ui
//If view is imported from react-native, shoutem components may have styling bugs


//redux stuff
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import reducers from '../reducers'
import {usernameChanged} from '../actions';

//react router flux
import {Actions} from "react-native-router-flux";

import Mock from '../../assets/mockData.json';

console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

class ProfilePage extends React.Component {
//---------------- CONSTRUCTOR --------------
  constructor(props){
    super(props);
    this.state = {
      fontsAreLoaded: false,
      username: 'boraik',
      recentLikedMovieImage: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png',
      mockData: Mock
    }

    this.renderRow = this.renderRow.bind(this);
  }

//---------------- This part is mandatory for shoutem components because 
// these fonts should be loaded before the compenents are mounted --------------
  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('../../node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('../../node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('../../node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('../../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('../../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('../../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('../../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });

    this.setState({fontsAreLoaded: true});
  }

  renderRow(rowData){
    this.setState({pageIsLoaded: true});
    console.log(this.state.pageIsLoaded)
      return (
      <TouchableOpacity onPress={()=> console.log("Here we will call navigation function to movie page")}>
        <Row styleName="small">
            <Image
              style={styles.movieImage}
              source={{uri: rowData.moviePhotoUrl}}
            />
            <Text>{rowData.movieName}</Text>
        </Row>
      </TouchableOpacity>
      );
  }
  
  render() {
    //If fonts aren't loaded, spinner will continue to spin
    if (!this.state.fontsAreLoaded) {
        return  (
          <Row style={styles.container}>
              <ActivityIndicator size="large" color="#0000ff" />
          </Row>
        );
    }
    //If fonts are loaded, font errors won't occur so our app can be rendered
    else{ 
     return(
       <Screen style={styles.container}>
          <View style={{paddingTop: Platform.OS === "ios" ? 0 : (StatusBar.currentHeight || 0)}}>
            <NavigationBar title={(this.state.username).toUpperCase()} styleName="inline" style={{container: {
              height: (Platform.OS === "ios" ? height/12 : height/15),

            }}}/>
          </View>
          {/* marginBottom is for overlapping of bottom navigation bar and scrollview */}
          <ScrollView style={{marginBottom: 41}} >
            <ImageBackground styleName="large-banner"
            blurRadius={10}
            source={{ uri: this.state.recentLikedMovieImage }}>
              <Tile>
                <Image
                styleName="medium-avatar"
                style={{marginTop: 5}}
                source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'}}
                />
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginRight: width/5, alignItems: 'center'}}>
                    <Title style={{color: 'white'}}> Followers </Title>
                    <Subtitle style={{color: 'white'}}> 99 </Subtitle>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Title style={{color: 'white'}}> Following </Title>
                    <Subtitle style={{color: 'white'}}> 68 </Subtitle>
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
}

//These two functions are for movieImage styling
let window = Dimensions.get('window');
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

const mapStateToProps = ({allReducers}) => {
  
  const { username} = allReducers;
  return { username};
};

export default connect(mapStateToProps,  { usernameChanged, })(ProfilePage);