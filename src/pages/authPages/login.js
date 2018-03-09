import React, { Component } from 'react'
import {
  Alert,
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
  TextInput
} from 'react-native'
import { Font } from 'expo';
import { Input, Button } from 'react-native-elements';

//redux stuff
import { connect } from 'react-redux';
import { userChanged } from '../../actions'

//navigation
import { Actions } from 'react-native-router-flux';

//images and icons
import BackgroundImage from '../../../assets/authBackground.jpg';
//If Icon line gives metro bundler error, simply run this command and restart the project
// rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import MovifyLogo from '../../../assets/movify.png';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
//Simple math, just adjusts image sizes and positions
const logoOriginalHeight = 162;
const logoOriginalWidth = 435;
const logoHeight = SCREEN_HEIGHT/10;
const logoWidth = (SCREEN_HEIGHT/10)*(logoOriginalWidth/logoOriginalHeight);
const sloganOriginalHeight = 114;
const sloganOriginalWidth = 1020;
const sloganHeight = SCREEN_HEIGHT/20;
const sloganWidth = (SCREEN_HEIGHT/20)*(sloganOriginalWidth/sloganOriginalHeight);


class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      emailValid: true,
      passwordValid: true,
    }

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.login = this.login.bind(this);
  }
 
  login() {

    LayoutAnimation.easeInEaseOut();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    if (
      emailValid &&
      passwordValid
    ) {
      this.setState({ isLoading: true })
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ isLoading: false });
        Alert.alert('🎸', 'You rock');
      }, 1500)
    }
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid
  }

  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  }

  render() {
    const {
      isLoading,
      selectedType,
      fontLoaded,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
      username,
      usernameValid,
      usernameInput
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
            <Image
            style={{
              width: logoWidth, height: logoHeight,
              marginLeft: (SCREEN_WIDTH-logoWidth)/2,
              marginRight: (SCREEN_WIDTH-logoWidth)/2,
              marginTop: SCREEN_HEIGHT/15
            }}
            source={MovifyLogo}
          />
        
            {/* change marginBottom of this view if you want to adjust space between login area and bottom of the screen  */}
            <View style={{marginBottom: SCREEN_HEIGHT/8}}>
              <FormInput
                refInput={input => (this.emailInput = input)}
                icon="envelope"
                value={email}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                displayError={!emailValid}
                errorMessage="Please enter a valid email address"
                onSubmitEditing={() => {
                  this.validateEmail()
                  this.passwordInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.passwordInput = input)}
                icon="lock"
                value={password}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                secureTextEntry
                returnKeyType="next"
                displayError={!passwordValid}
                errorMessage="Please enter at least 8 characters"
                onSubmitEditing={() => {
                  this.validatePassword()
                  this.confirmationPasswordInput.focus()
                }}
              />
              <Button
              loading={isLoading}
              text="LOGIN"
              containerStyle={{ flex: -1 }}
              buttonStyle={styles.signUpButton}
              ViewComponent={require('expo').LinearGradient}
              linearGradientProps={{
                colors: ['#FF9800', '#F44336'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              textStyle={styles.signUpButtonText}
              onPress={this.login}
              disabled={isLoading}
            />

            <View style={styles.loginHereContainer}>
            <Text style={styles.alreadyAccountText}>
              Don't have an account?
            </Text>
            <Button
              text="Sign Up"
              textStyle={styles.loginHereText}
              containerStyle={{ flex: -1 }}
              buttonStyle={{ backgroundColor: 'transparent' }}
              underlayColor="transparent"
              onPress={() => {
                //4.0.0-beta.28 Actions.replace gives TypeError: undefined is not an object (evaluating 'resetAction.actions.map')
                //it only works with 4.0.0-beta.27 for now
                Actions.push('Signup');
              }}
            />
          </View>

          <View style={styles.loginHereContainer}>
            <Text style={styles.alreadyAccountText}>
              Forgot password?
            </Text>
            <Button
              text="Reset password"
              textStyle={styles.loginHereText}
              containerStyle={{ flex: -1 }}
              buttonStyle={{ backgroundColor: 'transparent' }}
              underlayColor="transparent"
              onPress={() => {
                //4.0.0-beta.28 Actions.replace gives TypeError: undefined is not an object (evaluating 'resetAction.actions.map')
                //it only works with 4.0.0-beta.27 for now
                Actions.push('ResetPassword');
              }}
            />
          </View>
        </View>
            
          </KeyboardAvoidingView>
          
        </ScrollView>
        </ImageBackground>
        )
  }
}

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props
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
  )
}

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
  )
}

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
    width: SCREEN_WIDTH/(1.25),
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
  loginHereContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alreadyAccountText: {
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    fontSize: 12,
  },
  container2: {
    flex: 1,
    position: 'relative',
  },
})

const mapStateToProps = ({allReducers}) => {
  
  const { user } = allReducers;
  return { user };
};

export default connect(mapStateToProps,  { userChanged })(LoginScreen);