import React from 'react';
// import { SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { setNavigator } from './src/navigationRef';
// import AndroidSafeArea from './src/global/AndroidSafeArea';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { FontAwesome } from '@expo/vector-icons';

const trackFlow = createStackNavigator({
  TrackList : TrackListScreen,
  TrackDetail : TrackDetailScreen
});

trackFlow.navigationOptions = {
  style : {
    // paddingBottom: 100,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  labelStyle : {
    paddingBottom: 100,
    borderColor: 'red',
    borderWidth: 1,
  },
  title : 'Tracks',
  tabBarIcon : <FontAwesome name="th-list" size={20}/>
}

const switchNavigator = createSwitchNavigator({
  ResolveAuth : ResolveAuthScreen,
  loginFlow : createStackNavigator({
    Signup : SignupScreen,
    Signin : SigninScreen
  }),
  mainFlow : createBottomTabNavigator({
    trackFlow : trackFlow,
    Trackcreate : TrackCreateScreen,
    Account : AccountScreen
  },
  {

    tabBarOptions: {
        showLabel: true,
        style: {
          marginBottom : 8
        }
      }
    })
});

// export default createAppContainer(switchNavigator);

const App =  createAppContainer(switchNavigator);

export default () => {
  return(
  <AuthProvider>
    <TrackProvider>
      <LocationProvider>
          {/* <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}> */}
          {/* <SafeAreaView forceInset={{ top : 'always' }}> */}
          <App ref={(navigator) => {setNavigator(navigator)}}/>
          {/* </SafeAreaView> */}
          {/* </SafeAreaView> */}
        </LocationProvider>
      </TrackProvider>
    </AuthProvider>
  );
};

// To run 
// first run : ngrok http 3000  and update baseURL after this inside api=>tracker
// second run server : npm run dev
// third run front end project : npm start