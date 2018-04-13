import React from 'react';
import { Dimensions, Platform, TouchableOpacity } from 'react-native';

import { View, ListView, Image, Row, Text, ScrollView } from '@shoutem/ui';

import { connect } from 'react-redux';
import { searchTextChanged } from '../actions';

import Mock from '../../assets/mockData.json';

//react native elements
import SearchBar from '../components/searchBar';

//IMPORTANT REMINDER: View should be imported from @shoutem/ui
//If view is imported from react-native, shoutem components may have styling bugs


console.disableYellowBox = true;

class ComponentName extends React.Component {
//---------------- CONSTRUCTOR --------------
  constructor(props) {
    super(props);
    this.state = {
      test: '',
      searchText: '',
      defaultData: undefined,
      mockData: Mock,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    //get default data
    //set default data
    //let defaultData = request default data
    //this.setState({defaultData: defaultData})
  }

  renderRow(rowData) {
      return (
      <TouchableOpacity onPress={() => console.log('Here we will call navigation function to movie page')}>
        <Row styleName="small">
            <Image
              style={styles.movieImage}
              source={{ uri: rowData.moviePhotoUrl }}
            />
            <Text>{rowData.movieName}</Text>
        </Row>
      </TouchableOpacity>
      );
  }

  render() {
     return (
      <View>
          <SearchBar />
          {/* marginBottom is for overlapping of bottom navigation bar and scrollview */}
          <ScrollView style={{ marginBottom: 115 }} >
          <ListView
            //change data with this.props.searchData.searchData when backend is ready
            data={this.state.mockData}
            renderRow={(rowData) => this.renderRow(rowData)}
            //Don't remove.It is for this bug --> https://github.com/facebook/react-native/issues/1831
            removeClippedSubviews={false}
          />
          </ScrollView>
          {/* <Text>{this.props.searchText !== '' ? this.props.searchText.searchText : "search text is blank"}</Text>
          <Text>{this.props.searchData !== undefined ? this.props.searchData.searchData : "search data is undefined"}</Text> */}
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
  const { searchText, searchData } = allReducers;
  return { searchText, searchData };
};

export default connect(mapStateToProps, { searchTextChanged })(ComponentName);
