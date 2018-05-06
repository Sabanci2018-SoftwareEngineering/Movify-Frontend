import React from 'react';
import { Dimensions, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { View, ListView, Image, Row, Text, ScrollView, Icon } from '@shoutem/ui';
import { StackNavigator } from 'react-navigation';

import { connect } from 'react-redux';
import { searchDataChanged } from '../actions';
import MovieDetailsScreen from './MovieDetailsScreen';
import SearchBar from '../components/searchBar';

class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
    header: null
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderListView = this.renderListView.bind(this);
  }

  renderRow(rowData) {
    // to check available poster sizes --> https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400
    return (
    <TouchableOpacity onPress={() => this.props.navigation
      .navigate('MovieDetails', {movieName: rowData.title, movieId: rowData.id})}>
      <Row styleName="small">
          <Image
            style={styles.movieImage}
            source={{ uri: `http://image.tmdb.org/t/p/w92${rowData.poster_path}` }}
          />
          <Text>{rowData.title}</Text>
          <Icon styleName="disclosure" name="right-arrow" />
      </Row>
    </TouchableOpacity>
    );
  }

  //If search response is received, it renders listview. Otherwise, spinner will be rendered.
  renderListView(){
    if (this.props.searchSpinner.searchSpinner !== undefined && this.props.searchSpinner.searchSpinner === true) {
      return (
        <Row style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </Row>
      );
    }
    else{
      /* marginBottom is for overlapping of bottom navigation bar and scrollview */
      return(
        <ScrollView style={{ marginBottom: window.height/11.5 }} >
          <ListView
            data={ this.props.searchData.searchData !== undefined ? this.props.searchData.searchData : this.props.searchData }
            renderRow={(rowData) => this.renderRow(rowData)}
            //Don't remove.It is for this bug --> https://github.com/facebook/react-native/issues/1831
            removeClippedSubviews={false}
          />
        </ScrollView>
      )
    }
  }

  render() {
    return (
    <View>
        <SearchBar />
        {this.renderListView()}
    </View>
     );
  }
}

//These two functions are for movieImage styling
const window = Dimensions.get('window');
function getSizeRelativeToReference(dimension, originalRefVal, actualRefVal) {
  return (dimension / originalRefVal) * actualRefVal;
}

function dimensionRelativeToIphone(dimension, actualRefVal = window.width) {
  // 375 is iPhone width
  return getSizeRelativeToReference(dimension, 375, actualRefVal);
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieImage: {
    width: dimensionRelativeToIphone(45),
    height: dimensionRelativeToIphone(45),
    borderRadius: Platform.OS === 'ios' ? 20 : 50,
    borderWidth: 0,
  }
};

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
