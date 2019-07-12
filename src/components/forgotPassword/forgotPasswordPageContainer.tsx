import React from 'react'
import {connect} from "react-redux";
import { RouteComponentProps } from 'react-router';
import {bindActionCreators} from "redux";
import {history} from "../../store/history";

import {submitForgotPassword, initializeAuth} from "../../actionCreators/authActionCreators";
import { State } from '../../store/state';

import {ConnectedForgotPasswordPage, ForgotPasswordFormData} from "./forgotPasswordPage";
import LoadingSpinner from "../loadingSpinner";

import repBarSrc from '../../assets/rep-bar.svg';
import {RepBar} from '../auth/loginPageContainer';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionToProps>;
export type CombinedProps = RouteComponentProps & StateProps & DispatchProps;

export class forgotPasswordPageContainer extends React.Component<CombinedProps> {

    componentDidMount() {
        if (!this.props.auth.isAuthInitialized) {
            this.props.actions.initializeAuth();
        }
    }

    getQueryParams() {
    }

    async onSubmit(values: ForgotPasswordFormData) {
        console.log(`Submit forgot password - email: ${values.primaryEmailAddress}`);
        await this.props.actions.submitForgotPassword(values.primaryEmailAddress);
    };

    render() {
        return (
            <React.Fragment>
                <RepBar />
                {this.props.auth.isAuthInitialized ? (
                    <>
                        <ConnectedForgotPasswordPage onSubmit={this.onSubmit.bind(this)}
                                            isSuccessful={this.props.auth.isSuccessful}
                                            isError={this.props.auth.isError}
                                            errorMessage={this.props.auth.errorMessage} />
                        {this.props.auth.isInProgress ? <LoadingSpinner /> : null}
                    </>
                ) : <LoadingSpinner />}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        auth: state.auth
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({submitForgotPassword, initializeAuth}, dispatch)
    };
}

export const ConnectedForgotPasswordPageContainer = connect(mapStateToProps, mapActionToProps)(forgotPasswordPageContainer);