import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import '../_mocklocation';  //just for testing purpose using fake live locations
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spacer from '../components/Spacer';

const TrackCreateScreen = ({ isFocused }) => {
    
    const { state, addLocation } = useContext(LocationContext);
    const { recording } = state;
    const callback = useCallback((location) => {
        addLocation(location, recording)
    }, [recording]) //here the callback func will be changed in memory only when the recording is changed otherwise,
                    // the same reference to func is pointed even after re-render.

    const [ err ] = useLocation( isFocused || recording , callback); //isFocused || recording means in useLocation shouldTrack will be true or false.
                                                                    //this means will track if recording is true even if it is in other screen and not record if it is false in other screen.
    return(
        <SafeAreaView forceInset={{ top:'always' }}>
              <KeyboardAwareScrollView
    //   style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
            <Text style={{ fontSize : 20, fontWeight : 'bold', alignSelf : 'center', margin : 15 }}>Add Track</Text>
            <Map/>
            {err ? <Text>Location Permission not given.</Text> : null}
            <TrackForm />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

TrackCreateScreen.navigationOptions = {
    headerShown : true,
    title : 'Add Track',
    headerTitleStyle: { alignSelf: 'center', fontSize : 24 },
    tabBarIcon : <FontAwesome name="plus" size={20}/>
};

const styles = StyleSheet.create({

});

export default withNavigationFocus(TrackCreateScreen);