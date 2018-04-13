import React from 'react';
import { ActivityIndicator } from 'react-native';

//for shoutem UI
import { Font } from 'expo';
import { View } from '@shoutem/ui';

//navigation
import { Scene, Router } from 'react-native-router-flux';

//redux stuff
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';

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

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fontsAreLoaded: false,
    };
  }

//---------------- This part is mandatory for shoutem components because 
// these fonts should be loaded before the compenents are mounted --------------
  async componentDidMount() {
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
      'Ionicons': require('./node_modules/@expo/vector-icons/fonts/Ionicons.ttf'),
      'FontAwesome': require('./node_modules/@expo/vector-icons/fonts/FontAwesome.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ fonstAreLoaded: true });
  }

  render() {
    //If fonts aren't loaded, spinner will continue to spin
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk)); 
    if (!this.state.fonstAreLoaded) {
      return <ActivityIndicator />;
    }
    else if (true) {
        return (
           <Provider store={store}>
               <View style={{ flex: 1 }}>
                    <Router hideNavBar={true}>
                        {/* If you want to use modal animation, initial scene key should be modal */}
                        <Scene key="modal" modal>
                            {/* Tab Container */}
                            <Scene key="tabbar" tabs={true} tabBarPosition="bottom" tabBarComponent={NavigationBar} tabBarStyle={{ borderTopColor: 'black', borderTopWidth: 1, backgroundColor: 'white' }}>
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
                             <Scene key="LoginOrSignup" component={LoginOrSignup} title="LoginOrSignup" hideNavBar={true} />
                             <Scene key="ResetPassword" component={ResetPassword} title="ResetPassword" hideNavBar={true} />
                             <Scene key="Signup" component={Signup} title="Signup" hideNavBar={true} />
                             <Scene key="Login" component={Login} title="Login" hideNavBar={true} />
                        </Scene>
                    </Router>
               </View>
           </Provider>
        );
    }
    //If fonts are loaded, font errors won't occur so, our app can be rendered
    //If user isn't authenticated, auth pages will be shown
    else if (false) { 
        return (
           <Provider store={store}>
               <View style={{ flex: 1 }}>
                    <Router hideNavBar={true}>
                        <Scene key="root">
                          <Scene key="LoginOrSignup" component={LoginOrSignup} title="LoginOrSignup" hideNavBar={true} />
                          <Scene key="ResetPassword" component={ResetPassword} title="ResetPassword" hideNavBar={true} />
                          <Scene key="Signup" component={Signup} title="Signup" hideNavBar={true} />
                          <Scene key="Login" component={Login} title="Login" hideNavBar={true} />
                        </Scene>
                    </Router>
               </View>
           </Provider>
        );
    }
  }
}
