import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);

    return(
        <>
            <SafeAreaView forceInset={{ top : 'always' }}>
                <View style={{ margin : 15, alignSelf : 'center'}}>
                    <Text style={{ fontSize : 20, fontWeight : 'bold' }}> Account </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Sign Out" onPress={signout}/>
                </View>
            </SafeAreaView>
        </>
    )
}

AccountScreen.navigationOptions = {
    headerShown : true,
    title : 'Account',
    headerTitleStyle: { alignSelf: 'center', fontSize : 24 },
    tabBarIcon : <FontAwesome name="gear" size={20}/>
};

const styles = StyleSheet.create({
    buttonContainer : {
        marginHorizontal : 15,
        marginVertical : 20,
    },
});

export default AccountScreen;