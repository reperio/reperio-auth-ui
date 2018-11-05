import React from 'react'

import { Route, Switch, Link } from "react-router-dom";
import { Redirect } from "react-router";

const Hello = () => <p>Hello <Link to='/goodbye'>Goodbye</Link></p>;
const Goodbye = () => <p>Goodbye <Link to='/hello'>Hello</Link></p>;

const Routes = (props: any) => (
    <Switch>
        <Route exact path="/hello" component={Hello} />
        <Route exact path="/goodbye" component={Goodbye} />
        <Route>
            <Redirect to="/hello"/>
        </Route>
    </Switch>
);

export default Routes;