import React from 'react';

import { View, Button, Text, TextInput } from '@shoutem/ui';

//IMPORTANT REMINDER: View should be imported from @shoutem/ui
//If view is imported from react-native, shoutem components may have styling bugs

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
           <Text style={{ marginBottom: 10 }}> This is a new page starter. </Text>
           <TextInput
           placeholder={'This is a demo. Type the username'}
           onChangeText={(input) => this.props.usernameChanged({ username: input })}
           />
           <Text> {this.props.username !== undefined ? 'Username: ' + this.props.username.username : 'User is undefined.'} </Text>
           <Button 
           styleName="secondary" style={{ marginTop: 20 }} 
           onPress={() => { Actions.push('modalExample'); }}
           >
             <Text>Click here to navigate the other page</Text>
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

export default connect(mapStateToProps, { usernameChanged, })(ComponentName);
