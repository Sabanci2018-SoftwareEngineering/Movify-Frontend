import React from 'react';
import { View, Text, Button } from '@shoutem/ui';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { usernameChanged } from '../actions';

console.disableYellowBox = true;

class NewPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsAreLoaded: false,
    };
  }

  render() {
     return (
       <View style={styles.container}>
           <Text>
            Some text
           </Text>
           <Text>Username is:
           {this.props.username !== undefined ?
             this.props.username.username : 'User is undefined.'} </Text>
           <Button
           styleName="secondary" style={{ marginTop: 20 }}
           onPress={() => { Actions.popTo('NewPage'); }
            }
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

export default connect(mapStateToProps, { usernameChanged })(NewPage2);
