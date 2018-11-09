import React from 'react'
import {connect} from "react-redux";
import {setAuthToken} from "../../actionCreators/authActionCreators";
import {bindActionCreators} from "redux";
import LoginForm from "../../components/auth/loginForm";
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store/state';

class LoginFormValues {
    primaryEmailAddress: string;
    password: string;
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class LoginFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(values: LoginFormValues) {
        await this.props.actions.setAuthToken(values.primaryEmailAddress);
        console.log("onSubmit");
    };

    async navigateToForgotPassword() {
        // history.push('/forgotPassword');
        console.log("navigateToForgotPassword")
    };

    render() {
        return (
            <LoginForm  onSubmit={this.onSubmit.bind(this)} 
                        navigateToForgotPassword={this.navigateToForgotPassword.bind(this)} 
                        authSession={this.props.authSession} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        // authSession: state.authSession
        authSession: {}
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({setAuthToken}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(LoginFormContainer);