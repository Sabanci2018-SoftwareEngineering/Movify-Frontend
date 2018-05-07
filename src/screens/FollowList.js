import React from 'react';
import { Dimensions, Platform, StatusBar, TouchableOpacity, Image } from 'react-native';

import { View, NavigationBar, Icon, Button, Screen, ScrollView, ListView, Row, Subtitle, Divider} from '@shoutem/ui';

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

    renderRow(user){
        return(
          <TouchableOpacity
          onPress={() => this.props.navigation
            .navigate('OtherProfile', {navigation: this.props.navigation, username: user.username})}
          >
            <Row>
                <Image
                    style={styles.userAvatar}
                    source={{ uri: user.picture }} //'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'
                />
                <View style={styles.username}>
                    <Subtitle>{user.username}</Subtitle>
                </View>
                <Icon styleName="disclosure" name="right-arrow" />
            </Row>
            <Divider styleName="line" />
          </TouchableOpacity>
        )
      }

    render(){
        return(
            <Screen style={styles.container}>
                {this.returnNavigationBar()}
                <ScrollView>
                    <ListView
                    data={this.state.users}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    //Don't remove.It is for this bug --> https://github.com/facebook/react-native/issues/1831
                    removeClippedSubviews={false}
                    />
                </ScrollView>
            </Screen>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navigationBarView: {
        paddingTop: Platform.OS === 'ios' ? 0 : (StatusBar.currentHeight || 0)
    },
    userAvatar: {
        borderRadius: 30,
        height: 60,
        width: 60,
        borderWidth: 2,
        borderColor: 'transparent',
        marginRight: 10
    },
    username: {
        flexDirection: 'row'
    },
}