import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';
import { FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

const Map = () => {
    const { state : {currentLocation, locations } } =  useContext(LocationContext);
    const [ show, setShow ] = useState(false);

    useEffect(() => {
        show ? setShow(false) : null
    },[show]);

    // const latitude = state.currentLocation.coords.latitude;
    // const longitude = state.currentLocation.coords.longitude;
    // console.log(state);
    if(!currentLocation){
        return(
            <View style={{ flex : 1 }}>
                <ActivityIndicator style={{ marginTop : 200 }} size="large"/>
            </View>
        );
    }
    return(
        <View>
            <MapView style={styles.mapStyle} 
            initialRegion = {{
                // latitude : 12.9716,
                // longitude : 77.5946,
                ...currentLocation.coords,  //give current latitude and longitude other values from here are optional
                latitudeDelta : 0.00922*1.5,
                longitudeDelta : 0.00421*1.5,
            }}
            region = {show ? {
                ...currentLocation.coords,  //give current latitude and longitude other values from here are optional
                latitudeDelta : 0.00922*1.5,
                longitudeDelta : 0.00421*1.5,
            }  : null }
            >
                <Polyline coordinates={locations.map(loc => loc.coords)}/>    

                <Circle 
                    center={currentLocation.coords}
                    radius={40}
                    strokeColor = "rgba(158,158,255,1.0)"
                    fillColor = "rgba(158,158,255,0.3)"
                />
            </MapView>
                <TouchableOpacity style={{alignSelf : 'flex-end', padding : 10, zIndex : 1000}}
                    onPress={() => {
                        setShow(true)
                        console.log('pressed')
                    }}>
                        <View>
                            <FontAwesome
                            name="dot-circle-o"
                            size={30}
                            color="black"/>
                        </View>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mapStyle : {
        height : 300,
    }
});

export default Map;