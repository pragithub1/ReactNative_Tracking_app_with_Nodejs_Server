import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation'; //withNavigation is used for navigating within a child of a component

const NavLink = ({ text, navigation, routeName }) => {
        return(
            <Spacer>
            <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Text style={{ color : 'blue' }}>{text}</Text>
            </TouchableOpacity>
        </Spacer>
        );
};

const styles = StyleSheet.create({

});

export default withNavigation(NavLink);

            