import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from "redux-devtools-extension";
import createRootReducer from '../reducers';
import { history } from "./history";
import {State} from "./state";

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
}

export function configureStore(initialState?: RecursivePartial<State>) {
    const middleware = [
        thunk,
        routerMiddleware(history),
    ];

    return createStore(
        createRootReducer(history), 
        initialState, 
        composeWithDevTools(
            applyMiddleware(...middleware),
        )
    );
}