import React, { useState, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';

const AuthForm = ({ headerTitle, errorMessage, buttonTitle, onSubmitFun }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return(
        <>
            <Spacer>
            <Text style={styles.textStyle}>{headerTitle}</Text>
            </Spacer>
            <Spacer>
            <Input label="Email"
                    value = {email}
                    onChangeText = {(newEmail) => setEmail(newEmail)}
                    autoCapitalize = "none"
                    autoCorrect = {false}
            />
            <Input label="Password"
                    secureTextEntry = {true}
                    value = {password}
                    onChangeText = {(newPassword) => setPassword(newPassword)}
                    autoCapitalize = "none"
                    autoCorrect = {false}
            />
            {errorMessage ? <Text style={styles.errorStyle}>{errorMessage}</Text> : null}
            </Spacer>
            <Spacer>
                <Button title={buttonTitle} onPress={ () => onSubmitFun({ email, password })}/>
            </Spacer>
        </>
    );
}

const styles = StyleSheet.create({
    textStyle : {
        fontSize : 24,
        fontWeight : 'bold',
        alignSelf : 'center',
    },
    errorStyle : {
        color : 'red',
        marginLeft : 15,
        marginTop : 15
    }
});

export default AuthForm;