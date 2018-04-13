import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import { Button } from 'react-native-elements';

//navigation
import { Actions } from 'react-native-router-flux';

//redux stuff
import { connect } from 'react-redux';
import { userChanged } from '../../actions';

//Logo, bgimage and slogan
import BackgroundImage from '../../../assets/authBackground.jpg';
import MovifyLogo from '../../../assets/movify.png';
import YourCatalog from '../../../assets/yourCatalog.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

//Simple math, just adjusts image sizes and positions
const logoOriginalHeight = 162;
const logoOriginalWidth = 435;
const logoHeight = SCREEN_HEIGHT / 10;
const logoWidth = (SCREEN_HEIGHT / 10) * (logoOriginalWidth / logoOriginalHeight);

const sloganOriginalHeight = 114;
const sloganOriginalWidth = 1020;
const sloganHeight = SCREEN_HEIGHT / 20;
const sloganWidth = (SCREEN_HEIGHT / 20) * (sloganOriginalWidth / sloganOriginalHeight);

class LoginScreen extends Component {
  
  render() {
    return (
      <ImageBackground source={BackgroundImage} style={styles.container}>
          <Image
            style={{
              width: logoWidth, 
              height: logoHeight,
              marginLeft: (SCREEN_WIDTH - logoWidth) / 2,
              marginRight: (SCREEN_WIDTH - logoWidth) / 2,
              marginTop: SCREEN_HEIGHT / 15
            }}
            source={MovifyLogo}
          />

          <Image
            style={{
              width: sloganWidth, 
              height: sloganHeight,
              marginLeft: (SCREEN_WIDTH - sloganWidth) / 2,
              marginRight: (SCREEN_WIDTH - sloganWidth) / 2,
              marginTop: SCREEN_HEIGHT / 100
            }}
            source={YourCatalog}
          />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button
                title='LOGIN'
                onPress={() => Actions.Login()}
                buttonStyle={{ height: 50, width: 250, backgroundColor: 'white', borderRadius: 30 }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: 'black' }}
            />
            <Button
                title='SIGN UP'
                onPress={() => Actions.Signup()}
                buttonStyle={{ height: 50, width: 250, backgroundColor: 'white', borderRadius: 30, marginTop: 18 }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: 'black' }}
            />
          </View>
 
        </ImageBackground>
        );
      }
  }


//If you want to add background image, just change backgroundColor of container to transparent
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: 'transparent',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps, { userChanged })(LoginScreen);
