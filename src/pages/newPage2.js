import React from 'react';

import { View, Button, Text } from '@shoutem/ui';

//react router flux
import { Actions } from 'react-native-router-flux';

//redux stuff
import { connect } from 'react-redux';
import { usernameChanged } from '../actions';


console.disableYellowBox = true;

class ComponentName extends React.Component {

  render() {
     return (
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
           <Text>Username is: {this.props.username !== undefined ? this.props.username.username : 'User is undefined.'} </Text>
           <Button 
           styleName="secondary" style={{ marginTop: 20 }} 
           onPress={() => { Actions.pop(); }}
           >
             <Text>Click here to navigate home page</Text>
            </Button>
       </View>
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

const mapStateToProps = ({ allReducers }) => {
  const { username } = allReducers;
  return { username };
};

export default connect(mapStateToProps, { usernameChanged })(ComponentName);
