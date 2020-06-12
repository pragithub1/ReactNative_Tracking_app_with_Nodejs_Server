import * as Location from 'expo-location';

const tenMetersWithDegree = 0.0001;

const getLocation = increment => {
    return {
        timestamp : 10000000,
        coords : {
            speed : 0,
            heading : 0,
            accuracy : 5,
            altitudeAccuracy : 5,
            altitude : 5,
            longitude : 77.6388146 + increment * tenMetersWithDegree,
            latitude : 12.974694 + increment * tenMetersWithDegree
        }
    };
};

let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged',{
        watchId : Location._getCurrentWatchId(),
        location : getLocation(counter)
    });
    counter++;
}, 1000);

