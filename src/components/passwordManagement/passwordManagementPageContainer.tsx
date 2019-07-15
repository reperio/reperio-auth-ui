import React from 'react'
import {connect} from "react-redux";
import { RouteComponentProps } from 'react-router';
import {bindActionCreators} from "redux";
import queryString from "query-string";
import {history} from "../../store/history";

import {submitResetPassword, initializeAuth} from "../../actionCreators/authActionCreators";
import { State } from '../../store/state';

import {ConnectedResetPasswordPage, ResetPasswordFormData} from "./passwordManagementPage";
import LoadingSpinner from "../loadingSpinner";

import repBarSrc from '../../assets/rep-bar.svg';
import {RepBar} from '../auth/loginPageContainer';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionToProps>;
export type CombinedProps = RouteComponentProps<any> & StateProps & DispatchProps;

export class resetPasswordPageContainer extends React.Component<CombinedProps> {

    componentDidMount() {
        if (!this.props.auth.isAuthInitialized) {
            this.props.actions.initializeAuth();
        }
    }
    
    async onSubmit(values: ResetPasswordFormData) {
        const {token} = this.props.match.params;
        console.log(`Submit reset password - password: ${values.password} & passwordConfirmation: ${values.confirmPassword}`);
        await this.props.actions.submitResetPassword(token, values.password, values.confirmPassword);
    };

    render() {
        return (
            <React.Fragment>
                <RepBar />
                {this.props.auth.isAuthInitialized ? (
                    <>
                        <ConnectedResetPasswordPage onSubmit={this.onSubmit.bind(this)}
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
        actions: bindActionCreators({submitResetPassword, initializeAuth}, dispatch)
    };
}

export const ConnectedResetPasswordPageContainer = connect(mapStateToProps, mapActionToProps)(resetPasswordPageContainer);