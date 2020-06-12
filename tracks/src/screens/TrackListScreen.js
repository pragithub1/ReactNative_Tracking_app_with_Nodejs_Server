import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks } = useContext(TrackContext);
    return(
        <View>
            <NavigationEvents onWillFocus={fetchTracks}/>
            <FlatList 
                data = {state}
                keyExtractor = {item => item._id }
                renderItem = {({item}) => {
                    return(
                        <TouchableOpacity style={{ margin : 5}} onPress={() => navigation.navigate('TrackDetail', { _id : item._id })}>
                            <ListItem chevron title={item.name} />
                        </TouchableOpacity>
                    )
                }}
            />
            {/* <Button title="Go to TrackDetail Screen" onPress={ () =>{
                 navigation.navigate('TrackDetail') 
            }}/> */}
        </View>
    )
}

TrackListScreen.navigationOptions = {
    title: 'Track List',
    headerTitleStyle: { alignSelf: 'center', fontSize : 24 },
    headerStyle: {
    },
};

const styles = StyleSheet.create({

});

export default TrackListScreen;