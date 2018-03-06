import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import { Font, Components, Util } from 'expo';
import { Input,SocialIcon, Button } from 'react-native-elements';

//redux stuff
import { connect } from 'react-redux';
import { userChanged } from '../../actions';

//navigation
import { Actions } from 'react-native-router-flux';

//Logo, bgimage and slogan
import BackgroundImage from '../../../assets/authBackground.jpg';
import MovifyLogo from '../../../assets/movify.png';
import YourCatalog from '../../../assets/yourCatalog.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontsAreLoaded: false,
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('../../../node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('../../../node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('../../../node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('../../../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('../../../node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('../../../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('../../../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('../../../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('../../../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('../../../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('../../../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
      'Ionicons': require('../../../node_modules/@expo/vector-icons/fonts/Ionicons.ttf'),
      'FontAwesome': require('../../../node_modules/@expo/vector-icons/fonts/FontAwesome.ttf'),
    });

    this.setState({fontsAreLoaded: true});
  }

  render() {
    let langauge = Util.getCurrentDeviceCountryAsync();

    //Simple math, just adjusts image sizes and positions
    const logoOriginalHeight = 162;
    const logoOriginalWidth = 435;
    const logoHeight = SCREEN_HEIGHT/10;
    const logoWidth = (SCREEN_HEIGHT/10)*(logoOriginalWidth/logoOriginalHeight);

    const sloganOriginalHeight = 114;
    const sloganOriginalWidth = 1020;
    const sloganHeight = SCREEN_HEIGHT/20;
    const sloganWidth = (SCREEN_HEIGHT/20)*(sloganOriginalWidth/sloganOriginalHeight);

    if (!this.state.fontsAreLoaded) {
      return  (
        <View style={styles.container2}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    else{
    return (
      <ImageBackground source={BackgroundImage} style={styles.container}>
          <Image
            style={{
              width: logoWidth, height: logoHeight,
              marginLeft: (SCREEN_WIDTH-logoWidth)/2,
              marginRight: (SCREEN_WIDTH-logoWidth)/2,
              marginTop: SCREEN_HEIGHT/15
            }}
            source={MovifyLogo}
          />

          <Image
            style={{
              width: sloganWidth, height: sloganHeight,
              marginLeft: (SCREEN_WIDTH-sloganWidth)/2,
              marginRight: (SCREEN_WIDTH-sloganWidth)/2,
              marginTop: SCREEN_HEIGHT/100
            }}
            source={YourCatalog}
          />
          
          <View style = {{flex:1, justifyContent: 'center'}}>
          <Button
                text ='LOGIN'
                onPress={() => Actions.Login()}
                buttonStyle={{height: 50, width: 250, backgroundColor: 'white', borderRadius: 30}}
                containerStyle={{marginVertical: 10}}
                textStyle={{fontWeight: 'bold', color: 'black'}}
            />
            <Button
                text ='SIGN UP'
                onPress={() => Actions.Signup()}
                buttonStyle={{height: 50, width: 250, backgroundColor: 'white', borderRadius: 30, marginTop: 18}}
                containerStyle={{marginVertical: 10}}
                textStyle={{fontWeight: 'bold', color: 'black'}}
            />
          </View>
 
        </ImageBackground>
        )
      }
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

const mapStateToProps = ({allReducers}) => {
  
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps,  { userChanged })(LoginScreen);