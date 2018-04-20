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

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      emailValid: true,
      resetCode: '',
      showResetCodeBox: false,
      showResetPassword: false,
      password: '',
      confirmationPassword: '',
      passwordValid: true,
      confirmationPasswordValid: true,
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.sendResetCode = this.sendResetCode.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }
 
  sendResetCode() {
    LayoutAnimation.easeInEaseOut();
    const emailValid = this.validateEmail();
    if(emailValid){
        this.setState({ isLoading: true });
        setTimeout(() => {
          LayoutAnimation.easeInEaseOut();
          axios.post('http://localhost:3000/forgot', {
            email: this.state.email,
            })
            .then((response) => {
              if(!response.data.error){
                this.setState({ isLoading: false, showResetPassword: true })
              }
              else{
                this.setState({ isLoading: false })
                Alert.alert('An error occurred😔', 'Invalid email. Please check it');
              }
            })
            .catch((error) => {
              this.setState({ isLoading: false, showResetPassword: false });
              Alert.alert('An error occurred😔', 'Invalid email. Please check it');
            });
        }, 1000);
    }
  }

  resetPassword() {
    LayoutAnimation.easeInEaseOut();
    if (this.validatePassword() && this.validateConfirmationPassword()) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        axios.post(`http://localhost:3000/forgot/${this.state.resetCode}`, {
          email: this.state.email,
          password: this.state.password,
          })
          .then((response) => {
            Alert.alert(
              'Success', 
              'Your password has been reset successfully',
              [
                {text: 'Okay', onPress: () => this.props.navigation.goBack()},
              ],
              { cancelable: false }
            );
          })
          .catch((error) => {
            this.setState({ isLoading: false });
            Alert.alert('An error occurred😔', 'Invalid verification code');
          });
          }, 1500);
    }
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  }

  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  }

  validateConfirmationPassword() {
    const { password, confirmationPassword } = this.state;
    const confirmationPasswordValid = password === confirmationPassword && password.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ confirmationPasswordValid });
    confirmationPasswordValid || this.confirmationPasswordInput.shake();
    return confirmationPasswordValid;
  }

  render() {
    const {
      isLoading,
      email,
      emailValid,
    } = this.state;
    
    if (this.state.showResetPassword) {
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
                  refInput={input => (this.passwordInput = input)}
                  icon="lock"
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                  placeholder="Password"
                  secureTextEntry
                  returnKeyType="next"
                  displayError={!this.state.passwordValid}
                  errorMessage="Please enter at least 8 characters"
                  onSubmitEditing={() => {
                    this.validatePassword();
                    this.confirmationPasswordInput.focus();
                  }}
                />
                <FormInput
                  refInput={input => (this.confirmationPasswordInput = input)}
                  icon="lock"
                  value={this.state.confirmationPassword}
                  onChangeText={confirmationPassword =>
                    this.setState({ confirmationPassword })}
                  placeholder="Confirm Password"
                  secureTextEntry
                  displayError={!this.state.confirmationPasswordValid}
                  errorMessage="The password fields are not identics"
                  returnKeyType="go"
                  onSubmitEditing={() => {
                    this.validateConfirmationPassword();
                    this.signup();
                  }}
                />
                <FormInput
                  refInput={input => (this.emailInput = input)}
                  icon="envelope"
                  value={this.state.resetCode}
                  onChangeText={resetCode => this.setState({ resetCode: resetCode })}
                  placeholder="Reset Code"
                  keyboardType="email-address"
                  returnKeyType="next"
                  displayError={!emailValid}
                  errorMessage="Please enter a valid email address"
                />
                <Button
                loading={isLoading}
                title="RESET PASSWORD"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.signUpButton}
                ViewComponent={require('expo').LinearGradient}
                linearGradientProps={{
                  colors: ['#FF9800', '#F44336'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                titleStyle={styles.signUpButtonText}
                onPress={() => this.resetPassword()}
                disabled={isLoading}
                disabledStyle={styles.signUpButton}
                />
          </View>
          </KeyboardAvoidingView>
          </ScrollView>
          </ImageBackground>
      );
    }
    else {
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
                  refInput={input => (this.emailInput = input)}
                  icon="envelope"
                  value={email}
                  onChangeText={emailInput => this.setState({ email: emailInput })}
                  placeholder="Email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  displayError={!emailValid}
                  errorMessage="Please enter a valid email address"
                  onSubmitEditing={() => {
                    this.validateEmail();
                    this.passwordInput.focus();
                  }}
                />
                <Button
                loading={isLoading}
                title="SEND RESET CODE"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.signUpButton}
                ViewComponent={require('expo').LinearGradient}
                linearGradientProps={{
                  colors: ['#FF9800', '#F44336'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                titleStyle={styles.signUpButtonText}
                onPress={() => this.sendResetCode()}
                disabled={isLoading}
                disabledStyle={styles.signUpButton}
                />
                <RedirectHere
                message="Already know your password?"
                title="Login"
                redirect="Actions.pop()"
                />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
        );
    }
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

export default connect(mapStateToProps, { userChanged })(ResetPassword);
