import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from "redux-devtools-extension";
import createRootReducer from '../reducers';
import { history } from "./history";



export function configureStore(initialState?: object) {
    const middleware = [
        thunk,
        routerMiddleware(history),
    ];

    return createStore(
        createRootReducer(history), 
        initialState, 
        composeWithDevTools(
            applyMiddleware(...middleware)
        )
    );
}