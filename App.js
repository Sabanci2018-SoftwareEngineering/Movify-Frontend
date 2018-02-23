import React from 'react';
import { StyleSheet,  ActivityIndicator, Dimensions} from 'react-native';

//for shoutem UI
import { Font, Components } from 'expo';
import { View, DropDownMenu,ListView, NavigationBar, Screen, Icon, Title, Examples, Card, Image, Subtitle, Caption, Button, Row, styleName, Tile, Overlay, ImageBackground, Text } from '@shoutem/ui';

//redux stuff
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';

//navigation
import {Scene, Router} from 'react-native-router-flux';

//pages
import NewPage from './src/pages/newPage';
import NewPage2 from './src/pages/newPage2';

//IMPORTANT REMINDER: View should be imported from @shoutem/ui
//If view is imported from react-native, shoutem components may have styling bugs

console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

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
    if (!this.state.fontsAreLoaded) {
        return  (
          <Row style={styles.container}>
              <ActivityIndicator size="large" color="#0000ff" />
          </Row>
        );
    }
    //If fonts are loaded, font errors won't occur so, our app can be rendered
    else{ 
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk)); 
        return(
           <Provider store={store}>
               <View style={{flex: 1}}>
                    <Router hideNavBar={true}>
                        <Scene key="root">
                            <Scene key="NewPage" component={NewPage} title="New Page"  hideNavBar={true} />
                            <Scene key="NewPage2" component={NewPage2} title="New Page2"  hideNavBar={true} />
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