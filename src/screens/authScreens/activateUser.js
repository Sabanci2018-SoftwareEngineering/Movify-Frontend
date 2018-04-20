import React, { Component } from 'react';
import {
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  ImageBackground,
  Alert
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';

//If Icon line gives metro bundler error, simply run this command and restart the project
// rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//redux stuff
import { connect } from 'react-redux';
import { userChanged } from '../../actions';

//images and icons
import BackgroundImage from '../../../assets/authBackground.jpg';

import MovifyLogo from '../../components/movifyLogo';
import RedirectHere from '../../components/redirectHere';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class ActivateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: '',
      usernameValid: true,
      activationCode: '',
    };

    this.validateUsername = this.validateUsername.bind(this);
    this.activateAccount = this.activateAccount.bind(this);
  }
 
  activateAccount() {
    LayoutAnimation.easeInEaseOut();
    
    const { activationCode } = this.state;
      if (activationCode === '') {
          Alert.alert('Error', 'Please enter the verification code.');
      }
      else {
        this.setState({ isLoading: true });
        setTimeout(() => {
          LayoutAnimation.easeInEaseOut();
          axios.post(`http://localhost:3000/activate/${this.state.username}`, {
            key: this.state.verificationCode
            })
            .then((response) => {
              Alert.alert(
                'Success', 
                'User is verified. Please login',
                [
                  {text: 'Okay', onPress: () => this.props.navigation.goBack()},
                ],
                { cancelable: false }
              );
            })
            .catch((error) => {
            const errorMessage = error.response.data.error;
            this.setState({ isLoading: false });
            Alert.alert('An error occurred😔', `${errorMessage}`);
            });
            }, 1500);    
      }
    }



  validateUsername() {
    const { username } = this.state;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usernameValid });
    usernameValid || this.usernameInput.shake();
    return usernameValid;
  }

  render() {
    const {
      isLoading,
      username,
      usernameValid,
      activationCode,
    } = this.state;
    
      return (
        <ImageBackground source={BackgroundImage} style={styles.container2}>
          <ScrollView
              scrollEnabled={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.container}
          >
            <KeyboardAvoidingView
                behavior="position"
                contentContainerStyle={styles.formContainer}
            >
              <MovifyLogo />
              {/* change marginBottom of this view if you want to adjust space between login area and bottom of the screen  */}
              <View style={{ marginBottom: SCREEN_HEIGHT / 8 }}>
                      <FormInput
                      refInput={usernameInput => (this.usernameInput = usernameInput)}
                      icon="envelope"
                      value={username}
                      onChangeText={usernameInput => this.setState({ username: usernameInput })}
                      placeholder="Username"
                      returnKeyType="next"
                      displayError={!usernameValid}
                      errorMessage="Please enter a valid username"
                      onSubmitEditing={() => {
                          this.validateUsername();
                          this.passwordInput.focus();
                      }}
                      />
                      <FormInput
                      refInput={input => (this.activationCode = input)}
                      icon="envelope"
                      value={activationCode}
                      onChangeText={activationCodeInput => this.setState({ activationCode: activationCodeInput })}
                      placeholder="Activation code"
                      returnKeyType="next"
                      onSubmitEditing={() => {
                          this.validateUsername();
                          this.passwordInput.focus();
                      }}
                      />
                      <Button
                      loading={isLoading}
                      title="ACTIVATE ACCOUNT"
                      containerStyle={{ flex: -1 }}
                      buttonStyle={styles.signUpButton}
                      ViewComponent={require('expo').LinearGradient}
                      linearGradientProps={{
                      colors: ['#FF9800', '#F44336'],
                      start: [1, 0],
                      end: [0.2, 0],
                      }}
                      titleStyle={styles.signUpButtonText}
                      onPress={() => this.activateAccount()}
                      disabled={isLoading}
                      disabledStyle={styles.signUpButton}
                      />
                      <RedirectHere 
                      message="Activated account?"
                      title="Login Here"
                      redirect="Actions.pop()"
                      />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
        );
  }
}

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props;
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      containerStyle={styles.inputContainer}
      icon={<Icon name={icon} color="#7384B4" size={18} />}
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="white"
    />
  );
};

//If you want to add background image, just change backgroundColor of container to transparent
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: 'transparent',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,
  },
  signUp: {
    color: 'white',
    fontSize: 25,
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH / (1.25),
    alignItems: 'center',
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  userTypeLabel: {
    color: 'yellow',
    fontSize: 11,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: 'white', //#F44336
  },
  signUpButtonText: {
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
    marginTop: 15,
    marginRight: 5
  },
  container2: {
    flex: 1,
    position: 'relative',
  },
});

const mapStateToProps = ({ allReducers }) => {
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps, { userChanged })(ActivateUser);
