import React from 'react';
import { Platform, StatusBar, Dimensions} from 'react-native';
import { View, NavigationBar, Button, Icon } from '@shoutem/ui';

const height = Dimensions.get('window').height;

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      page: 'NewPage'
    };
  }

  returnLeftComponent(type){
    if(type === 'TitleAndLeftBack' || type === 'OtherProfile'){
      return(
          <Button
          onPress={()=> this.props.navigation.pop()}
          >
            <Icon name="back" />
          </Button>
        );
    }
    else if (type === 'OwnProfile'){
      console.log(this.props.navigation);
      return(
        <Button
        onPress={()=> this.props.navigation.navigate('ProfileSettings')}
        >
          <Icon name="settings" />
        </Button>
      );
    }
  }

  returnRightComponent(type){
    if(type === 'OwnProfile' || type === 'OtherProfile'){
      return(
        <Button
        onPress={()=> this.props.navigation.navigate('ProfileSearch', {profileScreenNavigation: this.props.navigation})}
        >
          <Icon name="search" />
        </Button>
      );
    }
  }

  render() {
    //type options --> 'OtherProfile', 'OwnProfile', 'TitleAndLeftBack', 'JustTitle', 
    const { title, type } = this.props;
    return(
    <View style={styles.navigationBarView}>
      <NavigationBar
            title={title} styleName="inline"
            style={styles.container}
            leftComponent={this.returnLeftComponent(type)}
            rightComponent={this.returnRightComponent(type)}
      />
    </View>
    );
  }
}

const styles = {
  container: {
    height: (Platform.OS === 'ios' ? height / 12 : height / 15)
  },
  navigationBarView: {
    paddingTop: Platform.OS === 'ios' ? 0 : (StatusBar.currentHeight || 0)
  },
}