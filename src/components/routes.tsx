import React from 'react'
import { Route, Switch, Link } from "react-router-dom";
import { Redirect } from "react-router";

import LoginFormContainer from "../containers/auth/loginFormContainer";

const Routes = (props: any) => (
    <div className="app-content">
        <Switch>
            <Route exact path="/login" component={LoginFormContainer} />
            <Route>
                <Redirect to="/login"/>
            </Route>
        </Switch>
    </div>
);

export default Routes;