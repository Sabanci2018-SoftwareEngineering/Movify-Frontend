import React, { Component } from 'react';
import { Header, Item, Input, Icon } from 'native-base';
import { Button, Icon as IconShoutem } from '@shoutem/ui';
//redux stuff
import { connect } from 'react-redux';

import { profileSearchDataChanged, movieSearchDataChanged, searchSpinnerChanged } from '../actions';

//axios
import axios from 'axios';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.handleMovieSearch = this.handleMovieSearch.bind(this);
    this.handleUserSearch = this.handleUserSearch.bind(this);
    this.returnButton = this.returnButton.bind(this);
  }

  handleMovieSearch(input) {
    //if input isn't blank and the last elements isn't space
    //(if the last element is space, search result will not change. So, request isn't needed )
    if(input !== '' && input.charAt(input.length-1) !== ' '){
      this.props.searchSpinnerChanged({ searchSpinner: true });
      axios.post('http://localhost:3000/search', {
        keyword: input,
        })
        .then((response) => {
          this.props.searchSpinnerChanged({ searchSpinner: false });
          this.props.movieSearchDataChanged({ movieSearchData: response.data.results.results});
        })
        .catch((error) => {
          console.log(error);
      });
    }
  }

  handleUserSearch(input) {
    //if input isn't blank and the last elements isn't space
    //(if the last element is space, search result will not change. So, request isn't needed )
    if(input !== '' && input.charAt(input.length-1) !== ' '){
      this.props.searchSpinnerChanged({ searchSpinner: true });
      axios.post('http://localhost:3000/profile/search', {
        keyword: input,
        })
        .then((response) => {
          this.props.searchSpinnerChanged({ searchSpinner: false });
          this.props.profileSearchDataChanged({ profileSearchData: response.data.results.users});
        })
        .catch((error) => {
          console.log(error);
      });
    }
  }

  returnButton(type){
      if(type){
        return(
        <Button
        onPress={()=> this.props.navigation.goBack()}
        >
          <IconShoutem name="back" />
        </Button>
        )
      }
  }
  render() {
    const { type } = this.props; //User search page --> type = true. Movie search page --> type = false;
    return (
        <Header searchBar rounded>
          {this.returnButton(type)}
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(input) => type ? this.handleUserSearch(input) : this.handleMovieSearch(input)} />
          </Item>
        </Header>
    );
  }
}

const mapStateToProps = ({ allReducers }) => {
    const { movieSearchData, profileSearchData } = allReducers;
    return { movieSearchData, profileSearchData };
  };
  
export default connect(mapStateToProps, { profileSearchDataChanged, movieSearchDataChanged, searchSpinnerChanged })(SearchBar);