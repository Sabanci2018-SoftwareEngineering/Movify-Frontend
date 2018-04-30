import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'

//Example call <FollowButton selected={true} />
export default class FollowButton extends React.Component {
    constructor() {
      super();
      this.state = {
        selected: false
      };
    }
  
    componentDidMount() {
      const { selected } = this.props;
      this.setState({ selected: selected });
    }
  
    render() {
      const { selected } = this.state;
      return (
        <Button
          title={selected ? 'Following' : 'Follow'}
          titleStyle={styles.title}
          buttonStyle={selected ?  styles.selected : styles.notSelected}
          containerStyle={{ marginRight: 10 }}
          onPress={() => this.setState({ selected: !selected })}
        />
      );
    }
}

const styles = StyleSheet.create({
    title: { 
        fontSize: 15,
        color: 'white',
        fontFamily: 'regular' 
    },
    selected: { 
        backgroundColor: 'rgba(213, 100, 140, 1)', 
        borderRadius: 100, 
        width: 127 
    },
    notSelected: { 
        borderWidth: 1, 
        borderColor: 'white', 
        borderRadius: 30, 
        width: 127, 
        backgroundColor: 'transparent'
    },
});