import React from 'react';
import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { Navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return {...state, errorMessage : action.payload};
        case 'clear_error':
            return {...state, errorMessage : null};
        case 'signin':
            return { errorMessage : '', token : action.payload };
        case 'signout':
            return { ...state, token : null , errorMessage : '' }
        default :
            return state;
    }
};

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type : 'clear_error'});
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({ type : 'signin', payload : token })
        Navigate('TrackList');
    }else{
        Navigate('Signup')
    }
};

const signin = (dispatch) => {
    return async ({ email : email, password : password}) => {
        try{
            const response = await trackerApi.post('/signin', { email : email, password : password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type : 'signin', payload : response.data.token });
            Navigate('TrackList');
        }catch(err){
            console.log(err.response.data);
            dispatch({ type : 'add_error', payload : 'Something went wrong in signin'});
        }
    };
};

const signup = (dispatch) => {
    return async ({ email : email, password : password}) => {
        try{  
            const response = await trackerApi.post('/signup', { email : email, password : password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type : 'signin', payload : response.data.token });

            Navigate('TrackList');
        }catch(err){
            console.log(err.response.data)
            dispatch({ type : 'add_error', payload : 'Something went wrong in signup'})
        }
    };
};

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type : 'signout' })
        Navigate('Signup')
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token : null, errorMessage : '' }
)