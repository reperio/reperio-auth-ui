import React from 'react'
import {connect} from "react-redux";
import { RouteComponentProps } from 'react-router';
import {bindActionCreators} from "redux";
import queryString from "query-string";
import {history} from "../../store/history";

import {checkPasswordToken, submitPasswordManagement, initializeAuth, returnToLogin} from "../../actionCreators/authActionCreators";
import { State } from '../../store/state';

import {ConnectedPasswordManagementPage, PasswordManagementFormData} from "./passwordManagementPage";
import LoadingSpinner from "../loadingSpinner";

import {RepBar} from '../auth/loginPageContainer';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionToProps>;
export type CombinedProps = RouteComponentProps<any> & StateProps & DispatchProps;

export class passwordManagementPageContainer extends React.Component<CombinedProps> {

    componentDidMount() {
        if (!this.props.auth.isAuthInitialized) {
            this.props.actions.initializeAuth();
        }
        const {token} = this.props.match.params;
        this.props.actions.checkPasswordToken(token);
    }
    
    async onSubmit(values: PasswordManagementFormData) {
        const queryParams = queryString.parse(this.props.location.search);
        const next = queryParams.next as string;
        const email = queryParams.email as string;
        const {token} = this.props.match.params;
        await this.props.actions.submitPasswordManagement(token, values.password, values.confirmPassword, next, email);
    };

    render() {
        const {action} = this.props.match.params;
    
        const createPassword = action === 'create';
        return (
            <React.Fragment>
                <RepBar />
                {this.props.auth.isAuthInitialized ? (
                    <>
                        <ConnectedPasswordManagementPage onSubmit={this.onSubmit.bind(this)}
                                            returnToLogin={this.props.actions.returnToLogin.bind(this)}
                                            isSuccessful={this.props.auth.isSuccessful}
                                            isError={this.props.auth.isError}
                                            isBadToken={this.props.auth.isBadToken}
                                            createPassword={createPassword}
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
        actions: bindActionCreators({checkPasswordToken, submitPasswordManagement, initializeAuth, returnToLogin}, dispatch)
    };
}

export const ConnectedPasswordManagementPageContainer = connect(mapStateToProps, mapActionToProps)(passwordManagementPageContainer);