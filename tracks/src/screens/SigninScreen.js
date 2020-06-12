import React, {  useContext } from 'react';
import {  StyleSheet} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents, SafeAreaView } from 'react-navigation';
// import SafeAreaView from 'react-native-safe-area-view';

const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext); 
    const { errorMessage } = state;

    return(
        // <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
        <SafeAreaView forceInset={{ top : 'always' }}>
             <NavigationEvents 
                //  onWillFocus = {}    //called while come from other screen navigation
                //  onDidFocus = {}     //called after come from other screen navigation
                onWillBlur = { clearErrorMessage }        //called while going to other screen navigation
                //  onDidBlur = {}      //called after going to other screen navigation
            />

            <AuthForm 
                headerTitle = 'SignIn for Tracker'
                errorMessage = {errorMessage}
                buttonTitle = "Sign In" 
                onSubmitFun = {signin}
            />
            <NavLink 
                text = "Don't have an account? Sign up instead"
                routeName = 'Signup'
            />
        </SafeAreaView>
    );
}

SigninScreen.navigationOptions = () => {
    return{
        headerShown : false
    };
};

const styles = StyleSheet.create({
});

export default SigninScreen;