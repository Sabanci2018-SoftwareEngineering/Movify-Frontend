import React from 'react';

import { GenericProfile } from '../components';

import { connect } from 'react-redux';
import { userChanged } from '../actions';

class ProfilePage extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render(){
    return(
      <GenericProfile
      navigation={this.props.navigation}
      username={this.props.user.user.key}
      type={'own'} // own or other 
      />
    );
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps, { userChanged })(ProfilePage);