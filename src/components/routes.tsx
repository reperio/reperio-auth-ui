import React from 'react'
import { Route, Switch, Link } from "react-router-dom";
import {Redirect, RouteComponentProps} from "react-router";
import queryString from "query-string";

import LoginFormContainer from "../containers/auth/loginFormContainer";


const RedirectWithQueryString = (props: RouteComponentProps) => {
    const queryParams = queryString.parse(props.location.search);

    return (
        <Redirect to={{
            pathname: "/login",
            search: queryString.stringify({next: queryParams.next})
        }} {...props} />
    );
};

const Routes = () => (
    <div className="app-content">
        <Switch>
            <Route exact path="/login" component={LoginFormContainer} />
            <Route exact path="/auth" component={null} />
            <Route component={RedirectWithQueryString} />
        </Switch>
    </div>
);

export default Routes;