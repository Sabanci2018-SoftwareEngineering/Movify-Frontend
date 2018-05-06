import React from 'react';
import { Dimensions, Platform, StatusBar } from 'react-native';

import { View, Text, NavigationBar, Icon, Button } from '@shoutem/ui';

import axios from 'axios';

const height = Dimensions.get('window').height;

export default class FollowList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    setFollowing(username){
        axios.get(`http://localhost:3000/profile/${username}/follows`)
            .then(res => {
            this.setState({users: res.data.results});
            });
    }

    setFollowers(username){
        axios.get(`http://localhost:3000/profile/${username}/followers`)
            .then(res => {
            this.setState({users: res.data.results});
            });
    }

    componentDidMount(){
        const { pageType, username } = this.props.navigation.state.params;
        pageType === 'Followers' ? this.setFollowers(username) : this.setFollowing(username);
    }

    returnLeftComponent(){
          return(
              <Button
              onPress={()=> this.props.navigation.pop()}
              >
                <Icon name="back" />
              </Button>
            );  
    }

    returnNavigationBar(){
        return(
          <View style={styles.navigationBarView}>
            <NavigationBar
                  title={ this.props.navigation.state.params.pageType } styleName="inline"
                  style={{ container: { height: (Platform.OS === 'ios' ? height / 12 : height / 15) }}}
                  leftComponent={this.returnLeftComponent(this.props.type)}
            />
          </View>
        );
      }

    render(){
        return(
            <View>
                {this.returnNavigationBar()}
                <Text>
                    Profile search page
                </Text>
            </View>
        );
    }
}

const styles = {
    navigationBarView: {
        paddingTop: Platform.OS === 'ios' ? 0 : (StatusBar.currentHeight || 0)
    },
}