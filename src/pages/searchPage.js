import React from 'react';
import { StyleSheet,  ActivityIndicator, Dimensions, Platform, TouchableOpacity} from 'react-native';
import { Font, Components } from 'expo';

import { View, DropDownMenu, NavigationBar, Screen, ListView, Icon, Title, Examples, Card, Image, Subtitle, Caption, Button, Row, styleName, Tile, Overlay, ImageBackground, Text, TextInput } from '@shoutem/ui';

//redux stuff
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import reducers from '../reducers'
import {searchTextChanged} from '../actions';

//react router flux
import {Actions} from "react-native-router-flux";

//react native elements
import SearchBar from '../components/searchBar';
import SearchIcon from '../../assets/searchIcon.png';

//IMPORTANT REMINDER: View should be imported from @shoutem/ui
//If view is imported from react-native, shoutem components may have styling bugs


console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

let data;

class ComponentName extends React.Component {
//---------------- CONSTRUCTOR --------------
  constructor(props){
    super(props);
    this.state = {
      test: '',
      fontsAreLoaded: false,
      searchText: '',
      defaultData: undefined,
      mockData: [
        {
          movieName: 'Avatar',
          moviePhotoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91N1lG%2BLBIS._SY679_.jpg'
        },
        {
          movieName: 'Avatar',
          moviePhotoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91N1lG%2BLBIS._SY679_.jpg'
        },
      ],
      pageIsLoaded: false,
    }

    this.renderRow = this.renderRow.bind(this);
    this.handleData = this.handleData.bind(this);
  }

//---------------- This part is mandatory for shoutem components because 
// these fonts should be loaded before the compenents are mounted --------------
  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('../../node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('../../node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('../../node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('../../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('../../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('../../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('../../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('../../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
      'Ionicons': require('../../node_modules/@expo/vector-icons/fonts/Ionicons.ttf'),
    });

    this.setState({fontsAreLoaded: true});
  }

  componentDidMount(){

    //get default data
    //set default data
    //let defaultData = request default data
    //this.setState({defaultData: defaultData})
  }

  renderRow(rowData){
    this.setState({pageIsLoaded: true});
    console.log(this.state.pageIsLoaded)
      return (
      <TouchableOpacity onPress={()=> console.log("Here we will call navigation function to movie page")}>
        <Row styleName="small">
            <Image
              style={styles.movieImage}
              source={{uri: rowData.moviePhotoUrl}}
            />
            <Text>{rowData.movieName}</Text>
        </Row>
      </TouchableOpacity>
      )
  }

  handleData(props){
    // if(this.props.searchText !== undefined){
    //     //if user write something and then delete everything, default movies 
    //     if(props.searchText.searchText === ''){
    //       return this.defaultData;
    //     }
    //     else{
    //       return 
    //     }
    // }
  }

  render() {
    
    //If fonts aren't loaded, spinner will continue to spin
    if (!this.state.fontsAreLoaded) {
        return  (
          <Row style={styles.container}>
              <ActivityIndicator size="large" color="#0000ff" />
          </Row>
        );
    }
    //If fonts are loaded, font errors won't occur so our app can be rendered
    else{ 
     return(
      <View>
          <SearchBar />
          <ListView
            //change data with this.props.searchData.searchData when backend is ready
            data={this.state.mockData}
            renderRow={(rowData) => this.renderRow(rowData)}
            //Don't remove.It is for this bug --> https://github.com/facebook/react-native/issues/1831
            removeClippedSubviews={false}
          />
          <Text>{this.props.searchText !== '' ? this.props.searchText.searchText : "search text is blank"}</Text>
          <Text>{this.props.searchData !== undefined ? this.props.searchData.searchData : "search data is undefined"}</Text>
      </View>
     );
   }
  }
}

//These two functions are for movieImage styling
let window = Dimensions.get('window');
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

const mapStateToProps = ({allReducers}) => {
  
  const { searchText, searchData } = allReducers;
  return { searchText, searchData };
};

export default connect(mapStateToProps,  { searchTextChanged})(ComponentName);