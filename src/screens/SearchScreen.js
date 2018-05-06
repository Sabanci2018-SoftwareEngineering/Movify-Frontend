import React from 'react';
import { View } from '@shoutem/ui';
import { StackNavigator } from 'react-navigation';

import { connect } from 'react-redux';
import { searchDataChanged } from '../actions';
import MovieDetailsScreen from './MovieDetailsScreen';
import { GenericSearch } from '../components';

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <View>
        <GenericSearch
        parentPageProps={this.props}
        type={false} //User search page --> type = true. Movie search page --> type = false;
        />
    </View>
     );
  }
}

const mapStateToProps = ({ allReducers }) => {
  const { searchData, searchSpinner } = allReducers;
  return { searchData, searchSpinner };
};

const SearchStack = StackNavigator(
  {
    Search: { screen: connect(mapStateToProps, { searchDataChanged })(SearchScreen)},
    MovieDetails: { screen: MovieDetailsScreen },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   }
);

export default SearchStack;
