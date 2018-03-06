import React, { Component } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

//redux stuff
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import reducers from '../reducers'
import { searchTextChanged, searchDataChanged } from '../actions';

class SearchBar extends Component {

  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind();
  }

  handleChange(props, input){

    //this line will be something like let searchData = axios.post(backend.com/givemeMovies=input)

    //since we don't have backend services right now, searchData = searchText
    props.searchDataChanged({searchData: input});
    props.searchTextChanged({searchText: input});
  }
  
  render() {
    return (
      <View style={{paddingTop: StatusBar.currentHeight}}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(input) => this.handleChange(this.props, input)} />
          </Item>
        </Header>
      </View>
    );
  }
}



const mapStateToProps = ({allReducers}) => {
  
    const { searchText, searchData } = allReducers;
    return { searchText, searchData };
  };
  
  export default connect(mapStateToProps,  { searchTextChanged, searchDataChanged })(SearchBar);