import React from 'react';
import { StyleSheet,  ActivityIndicator, Dimensions} from 'react-native';
import { Font, Components } from 'expo';

import { View, DropDownMenu,ListView, NavigationBar, Screen, Icon, Title, Examples, Card, Image, Subtitle, Caption, Button, Row, styleName, Tile, Overlay, ImageBackground, Text, TextInput } from '@shoutem/ui';

//redux stuff
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import reducers from '../reducers'
import {usernameChanged} from '../actions';

//react router flux
import {Actions} from "react-native-router-flux";

//IMPORTANT REMINDER: View should be imported from @shoutem/ui
//If view is imported from react-native, shoutem components may have styling bugs


console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

class ComponentName extends React.Component {
//---------------- CONSTRUCTOR --------------
  constructor(props){
    super(props);
    this.state = {
      fontsAreLoaded: false,
    }
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
       <View style={styles.container}>
           <Text> 
            You can see that user is still defined even you change the page. :) 
            Because it isn't stored in the newPage component's local state, it is like a global variable now.
            It is stored in the redux store.
            Since we need user token on everypage of the app
            it is better to keep these kind of objects on the redux store
            but if your variable is page spesific variable and if you will not use it on any other page,
            keeping this variable on the component's state is more practical.
           </Text>
           <Text>Username is: {this.props.username !== undefined ? this.props.username.username : "User is undefined."} </Text>
           <Button 
           styleName="secondary" style={{marginTop: 20}} 
           onPress={()=> {
             Actions.pop()}
            }
           >
             <Text>Click here to navigate home page</Text>
            </Button>
       </View>
     );
   }
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = ({allReducers}) => {
  
  const { username} = allReducers;
  return { username};
};

export default connect(mapStateToProps,  { usernameChanged, })(ComponentName);