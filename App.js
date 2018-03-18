import React from 'react';
import { StyleSheet,  ActivityIndicator, Dimensions, AsyncStorage} from 'react-native';

//for shoutem UI
import { Font, Components } from 'expo';
import { View, DropDownMenu,ListView, Screen, Icon, Title, Examples, Card, Image, Subtitle, Caption, Button, Row, styleName, Tile, Overlay, ImageBackground, Text } from '@shoutem/ui';

//redux stuff
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';

//navigation
import {Scene, Router, Modal, Actions} from 'react-native-router-flux';

//pages
import NewPage from './src/pages/newPage';
import NewPage2 from './src/pages/newPage2';
import SearchPage from './src/pages/searchPage';
import LoginOrSignup from './src/pages/authPages/loginOrSignup';
import Signup from './src/pages/authPages/signup';
import Login from './src/pages/authPages/login';
import ResetPassword from './src/pages/authPages/resetPassword';
import ProfilePage from './src/pages/profilePage';

//components
import NavigationBar from './src/components/navigationBar';

//IMPORTANT REMINDER: View should be imported from @shoutem/ui
//If view is imported from react-native, shoutem components may have styling bugs

console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

// Simple component to render something in place of icon
const TabIcon = ({ selected, title }) => {
  let state = Actions.state;

  return (
    <Text style={{color: selected ? 'red' :'red'}}>"{title}"</Text>
  );
}

export default class App extends React.Component {
  
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
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });

    //When fonts are loaded, fontsAreLoaded state will be true
    this.setState({fontsAreLoaded: true});
  }

  render() {
    //If fonts aren't loaded, spinner will continue to spin
    if(!this.state.fontsAreLoaded) {
        return  (
          <Row style={styles.container}>
              <ActivityIndicator size="large" color="#0000ff" />
          </Row>
        );
    }
    //If fonts are loaded, font errors won't occur so, our app can be rendered
    //If user is authenticated, user will be able to use the app
    else if(true){
      const store = createStore(reducers, {}, applyMiddleware(ReduxThunk)); 
        return(
           <Provider store={store}>
               <View style={{flex: 1}}>
                    <Router hideNavBar={true}>
                        {/* If you want to use modal animation, initial scene key should be modal */}
                        <Scene key="modal" modal>
                            {/* Tab Container */}
                            <Scene key="tabbar" tabs={true} tabBarPosition="bottom" tabBarComponent={NavigationBar} tabBarStyle={{borderTopColor:'black', borderTopWidth:1,backgroundColor:'white'}}>
                              {/*Tabs */}
                                <Scene key="NewPage" component={NewPage} title="NewPage" hideNavBar={true} />
                                <Scene key="NewPage2" component={NewPage2} title="NewPage" hideNavBar={true} />
                                <Scene key="ProfilePage" component={ProfilePage} title="ProfilePage" hideNavBar={true} />
                                <Scene key="SearchPage" component={SearchPage} title="Search" hideNavBar={true} />
                            </Scene>

                            {/* This is how we use modal navigation animation
                            call this function onClick
                            onPress={()=> {
                              Actions.push("modalExample")}
                             }
                             This scene should be added to here
                            <Scene key="modalExample" component={NewPage} title="Modal" hideNavBar /> */}
                        </Scene>
                    </Router>
               </View>
           </Provider>
        );
    }
    //If fonts are loaded, font errors won't occur so, our app can be rendered
    //If user isn't authenticated, auth pages will be shown
    else if(true){ 
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk)); 
        return(
           <Provider store={store}>
               <View style={{flex: 1}}>
                    <Router hideNavBar={true}>
                        <Scene key="root">
                          <Scene key="LoginOrSignup" component={LoginOrSignup} title="LoginOrSignup"  hideNavBar={true} />
                          <Scene key="ResetPassword" component={ResetPassword} title="ResetPassword"  hideNavBar={true} />
                          <Scene key="Signup" component={Signup} title="Signup"  hideNavBar={true} />
                          <Scene key="Login" component={Login} title="Login"  hideNavBar={true} />
                        </Scene>
                    </Router>
               </View>
           </Provider>
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