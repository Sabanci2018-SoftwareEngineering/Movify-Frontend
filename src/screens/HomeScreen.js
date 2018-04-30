import React from 'react';
import { AsyncStorage } from 'react-native';
import { View, Text, Button } from '@shoutem/ui';
import { connect } from 'react-redux';

import { userChanged } from '../actions';

import axios from 'axios';

let user;

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount(){
    try{
      AsyncStorage.getItem('user', (err, result) => {
        user = JSON.parse(result);
        this.props.userChanged({ user: user });

        //user logins again when app is opened because 
        //it loses cookies when app is closed
        axios.post('http://localhost:3000/login', {
          key: user.key,
          password: user.password,
          })
          .then((response) => {
            //console.log(response);
          })
          .catch((error) => {
            console.log(error.response);
          });

      });
    } catch(error){
      console.log(error);
    }
  }

  render() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Profile')}
          >
          <Text>Go to Profile Example </Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps, { userChanged })(HomeScreen);
