import React from 'react';

import { GenericProfile } from '../components';

import { connect } from 'react-redux';
import { userChanged } from '../actions';

import { StackNavigator } from 'react-navigation';

import MovieDetailsScreen from './MovieDetailsScreen';
import FollowList from './FollowList';
import ProfileSearch  from './ProfileSearch';
import OtherProfile from './OtherProfile';
import ProfileSettings from './ProfileSettings';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render(){
    return(
      <GenericProfile
      navigation={this.props.navigation}
      username={this.props.user.user.key}
      type={false} // false own profile, true other profile
      />
    );
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

const ProfileScreenStack = StackNavigator({
  ProfileScreen: { screen: connect(mapStateToProps, { userChanged })(ProfileScreen)},
  MovieDetails: { screen: MovieDetailsScreen },
  FollowList: { screen: FollowList },
  ProfileSearch: { screen: ProfileSearch },
  OtherProfile: { screen: OtherProfile },
  ProfileSettings: { screen: ProfileSettings }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

export default ProfileScreenStack;