import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
    const { state : {recording , name, locations },
            startRecording, 
            stopRecording, 
            changeName } = useContext(LocationContext);

    const [ saveTrack ] = useSaveTrack();
    
    console.log(locations.length);

    return(
        <View>
            <Spacer>
                <Input placeholder="Enter the track name"
                    value = {name}
                    onChangeText = {(newText) => changeName(newText)}/>
            </Spacer>
                {recording ? <Button buttonStyle={{backgroundColor: 'red', marginHorizontal : 15}} title = "Stop Tracking" onPress = {stopRecording}/>
                            :
                    <Button disabled={name ? false : true} buttonStyle={{ marginHorizontal : 15}} title = "Start Tracking" onPress = {startRecording}/> }
            <Spacer>
                {!recording && locations.length ? <Button onPress={saveTrack} buttonStyle={{backgroundColor: 'green'}} title = "Save Tracking" /> : null}
            </Spacer>

        </View>
    )
}

const styles = StyleSheet.create({

});

export default TrackForm;