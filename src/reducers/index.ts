import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router';

import { authReducer } from './authReducer';

export default (history: any) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    auth: authReducer
});
