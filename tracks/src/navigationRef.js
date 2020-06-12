import { NavigationActions } from 'react-navigation';
let navigator;

export const setNavigator = nav => {
    navigator = nav;
};

// used for navigate screen from other non component codes.
//whereas withNavigation is used for navigating within a child of a component and it is prefered.

export const Navigate = ( routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({
        routeName,
        params
    }));
};

