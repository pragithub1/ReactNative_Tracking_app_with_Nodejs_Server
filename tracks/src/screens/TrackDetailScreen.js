import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Polyline } from 'react-native-maps';
import { Context as TrackContext } from '../context/TrackContext';
import Spacer from '../components/Spacer';
import Popup from '../components/Popup';
import Toast from 'react-native-simple-toast';

let globalTrack = null;

const TrackDetailScreen = ({ navigation }) => {
    const [ visible, setVisible ] = useState(false);
    const [ deleteMsg, setDeleteMsg ] = useState('');
    const { state, deleteTrack } = useContext(TrackContext);
    const _id = navigation.getParam('_id');
    const track = state.find( t => t._id === _id );
    globalTrack = track;
    const initialCoords = track.locations[0].coords;

    const deleteFunc = async () => {
        try{
            await deleteTrack(_id);
            setDeleteMsg('Successfully deleted');
            navigation.navigate('TrackList');
        }catch(err){
            console.log(err.message)
            setDeleteMsg('Cannot delete, try Again!');
            setVisible(false)
        }
    }

    return(
        <View>
            {/* <Text style={{ fontSize : 48 }}> { track.name } </Text> */}
            <MapView
                initialRegion = {{
                latitudeDelta : 0.00922*1.5,
                longitudeDelta : 0.00421*1.5,
                ...initialCoords
                }} 

                style={styles.mapStyle}
            >
                <Polyline 
                    coordinates = {track.locations.map(loc => loc.coords)}
                />
            </MapView>
            <Spacer>
                <Button onPress={() => setVisible(true)} buttonStyle={{ backgroundColor: 'red', borderRadius : 20}} title="Delete"/>
            </Spacer>

            {deleteMsg ? Toast.show(deleteMsg, Toast.LONG) : null}

            <Popup visible = {visible} backdropPress={() => setVisible(false)}>
                <Text style={{ fontSize : 20, fontWeight : 'bold', padding : 10, marginTop : 10 }}>Are you sure?</Text>
                <Button buttonStyle={{ width : 250, marginBottom : 20, backgroundColor : 'green', borderRadius : 15 }}
                    title="Yes"
                    onPress={deleteFunc}/>
                <Button buttonStyle={{ width : 250, backgroundColor : 'orange', borderRadius : 15 }} 
                    onPress={() => setVisible(false)} 
                    title="No"/>
            </Popup>

        </View>
    )
};

TrackDetailScreen.navigationOptions = () => {
    // console.log(globalTrack)
    return {
        title : globalTrack ? globalTrack.name : 'Track Detail' ,
        headerTitleStyle : {
            alignSelf: 'flex-start',
            fontSize: 20
        }
    };
};

const styles = StyleSheet.create({
    mapStyle : {
        height : 300,
        marginTop : 15
    }
});

export default TrackDetailScreen;