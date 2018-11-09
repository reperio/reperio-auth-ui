import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from "redux-devtools-extension";
import createRootReducer from '../reducers';
import { history } from "./history";
import {State} from "./state";



export function configureStore(initialState?: State) {
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