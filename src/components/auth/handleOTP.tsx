import React from 'react'
import {State} from "../../store/state";
import {requestOTP} from "../../actionCreators/authActionCreators";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ExternalRedirect from "../externalRedirect";
import LoadingSpinner from "../loadingSpinner";

export interface HandleOTPProps {
    next: string;
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapActionToProps>;
export type CombinedProps = HandleOTPProps & StateProps & DispatchProps;

export class HandleOTP extends React.Component<CombinedProps> {

    componentDidMount() {
        if (!this.props.auth.otpIsSuccessful) {
            this.props.actions.requestOTP();
        }
    }

    render() {
        return this.props.auth.otpIsSuccessful ? <ExternalRedirect otp={this.props.auth.otp}
                                                                   next={this.props.next} /> : <LoadingSpinner />
    }
}

function mapStateToProps(state: State) {
    return {
        auth: state.auth
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({requestOTP}, dispatch)
    };
}

export const ConnectedHandleOTP = connect(mapStateToProps, mapActionToProps)(HandleOTP);