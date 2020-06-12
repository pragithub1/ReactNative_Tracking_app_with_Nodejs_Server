import { useState, useEffect } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';


export default ( shouldTrack, callback ) => {
    const [ err, setErr ] = useState(false);

        useEffect(() => {
            let subscriber;
            
            const startWatching = async () => {
                try{
                    const permissionResult = await requestPermissionsAsync();
                    {permissionResult.granted == false ? setErr(true) : setErr(false)}
    
                    subscriber = await watchPositionAsync({
                        accuracy : Accuracy.BestForNavigation,
                        timeInterval : 1000,
                        distanceInterval : 10
                    }, callback );
    
                }catch(e){
                    console.log(e)
                    // setErr(e);
                }
            };

            if(shouldTrack){
                startWatching();
            }else{
                if(subscriber){
                    subscriber.remove();
                }
                subscriber = null;
            }

            return () => {
                if(subscriber){
                    subscriber.remove();    //this is run every time useEffect runs. this return will be called to check if previously any listener has been set for watchPositionAsync func.
                    }                       //if there is it will remove it before starting new one.
            };

        }, [shouldTrack, callback]); //will run the code everytime shouldTrack var changes and callback function changes i.e recording in reducer changes.

        return [ err ];
}  