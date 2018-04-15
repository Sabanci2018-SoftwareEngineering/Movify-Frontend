import React from 'react';
import { View, Text, Button, TextInput } from '@shoutem/ui';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { usernameChanged } from '../actions';

console.disableYellowBox = true;

class NewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsAreLoaded: false,
    };
  }

  render() {
     return (
       <View style={styles.container}>
           <Text style={{ marginBottom: 10 }}> This is a new page starter. </Text>
           <TextInput
           placeholder={'This is a demo. Type the username'}
           onChangeText={
             (input) => this.props.usernameChanged({ username: input })
            }
           />
           <Text> {this.props.username !== undefined ?
             `Username:  ${this.props.username.username}` : 'User is undefined.'}
             </Text>
           <Button
           styleName="secondary" style={{ marginTop: 20 }}
           onPress={() => { Actions.NewPage2(); }}
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

 export default connect(mapStateToProps, { usernameChanged })(NewPage);
