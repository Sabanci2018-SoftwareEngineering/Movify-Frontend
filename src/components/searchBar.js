import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Header, Item, Input, Icon, } from 'native-base';

//redux stuff
import { connect } from 'react-redux';
import { searchDataChanged, searchSpinnerChanged } from '../actions';

//axios
import axios from 'axios';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(input) {

    //if input isn't blank and the last elements isn't space
    //(if the last element is space, search result will not change. So, request isn't needed )
    if(input !== '' && input.charAt(input.length-1) !== ' '){
      this.props.searchSpinnerChanged({ searchSpinner: true });
      axios.post('http://localhost:3000/search', {
        keyword: input,
        })
        .then((response) => {
          this.props.searchSpinnerChanged({ searchSpinner: false });
          this.props.searchDataChanged({ searchData: response.data.results.results});
        })
        .catch((error) => {
          console.log(error);
      });
    }
  }
  
  render() {
    return (
      <View style={{ paddingTop: StatusBar.currentHeight }}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(input) => this.handleChange(input)} />
          </Item>
        </Header>
      </View>
    );
  }
}

const mapStateToProps = ({ allReducers }) => {
    const { searchData } = allReducers;
    return { searchData };
  };
  
  export default connect(mapStateToProps, { searchDataChanged, searchSpinnerChanged })(SearchBar);
