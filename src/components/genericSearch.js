import React from 'react';
import { Dimensions, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { View, ListView, Image, Row, Text, ScrollView, Icon } from '@shoutem/ui';

import SearchBar from './searchBar';

export default class GenericSearch extends React.Component {
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
    <TouchableOpacity onPress={() => this.props.parentPageProps.navigation
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
  renderListView(type){
    const { profileSearchData, movieSearchData, searchSpinner } = this.props.parentPageProps;
    if (searchSpinner.searchSpinner !== undefined && searchSpinner.searchSpinner === true) {
      return (
        <Row style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
        </Row>
      );
    }
    else{
      //User search page --> type = true. Movie search page --> type = false;
      let listViewData = [];
      if(type && profileSearchData.profileSearchData !== undefined){
        listViewData = profileSearchData.profileSearchData;
      }
      else if( !type && movieSearchData.movieSearchData !== undefined){
        listViewData = movieSearchData.movieSearchData;
      }
      return(
        /* marginBottom is for overlapping of bottom navigation bar and scrollview */
        <ScrollView style={{ marginBottom: window.height/11.5 }} >
          <ListView
            data={ listViewData }
            renderRow={(rowData) => this.renderRow(rowData)}
            //Don't remove.It is for this bug --> https://github.com/facebook/react-native/issues/1831
            removeClippedSubviews={false}
          />
        </ScrollView>
      )
    }
  }

  render() {
    const { type } = this.props;
    return (
    <View>
        <SearchBar
        type={this.props.type} //User search page --> type = true. Movie search page --> type = false;
        />
        {this.renderListView(type)}
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
    borderRadius: Platform.OS === 'ios' ? dimensionRelativeToIphone(45) / 2 : 50,
    borderWidth: 0,
  }
};
