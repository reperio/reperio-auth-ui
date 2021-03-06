import React from 'react'
import { Route, Switch, Link } from "react-router-dom";
import {Redirect, RouteComponentProps} from "react-router";
import queryString from "query-string";

import {ConnectedLoginPageContainer} from "./auth/loginPageContainer";
import {ConnectedForgotPasswordPageContainer} from "./forgotPassword/forgotPasswordPageContainer";
import {ConnectedPasswordManagementPageContainer} from "./passwordManagement/passwordManagementPageContainer";



const RedirectWithQueryString = (props: RouteComponentProps) => {
    const queryParams = queryString.parse(props.location.search);

    return (
        <Redirect to={{
            pathname: "/login",
            search: queryString.stringify({next: queryParams.next})
        }} {...props} />
    );
};

export const Routes = () => (
    <div className="">
        <Switch>
            <Route exact path="/login" component={ConnectedLoginPageContainer} />
            <Route exact path="/forgotPassword" component={ConnectedForgotPasswordPageContainer} />
            <Route exact path="/passwordManagement/:token/:action" component={ConnectedPasswordManagementPageContainer} />
            <Route exact path="/auth" component={null} />
            <Route component={RedirectWithQueryString} />
        </Switch>
    </div>
);