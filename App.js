import React from 'react';

import { ActivityIndicator } from 'react-native';

import { Font } from 'expo';
import { View, Row } from '@shoutem/ui';

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { Scene, Router } from 'react-native-router-flux';

import NewPage from './src/pages/newPage';
import NewPage2 from './src/pages/newPage2';
import reducers from './src/reducers';

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.state,
      fontsAreLoaded: false,
    };
  }

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
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf')
    });

    this.setState({ fontsAreLoaded: true });
  }

  render() {
    if (!this.state.fontsAreLoaded) {
        return (
          <Row style={styles.container}>
              <ActivityIndicator size="large" color="#0000ff" />
          </Row>
        );
    }
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
       <Provider store={store}>
           <View style={{ flex: 1 }}>
                <Router >
                    <Scene key="root">
                        <Scene key="NewPage" component={NewPage} title="New Page" />
                        <Scene key="NewPage2" component={NewPage2} title="New Page2" />
                    </Scene>
                </Router>
           </View>
       </Provider>
    );
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
