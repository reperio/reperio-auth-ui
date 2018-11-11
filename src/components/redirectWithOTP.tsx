import React from 'react';

declare const CORE_UI_URL: string;

const RedirectWithOTP = (props: {otp: string, next?: string}) => {
    const redirectUrl = props.next || CORE_UI_URL;

    setTimeout(() => {
        window.location.assign(`${redirectUrl}?otp=${encodeURIComponent(props.otp)}`);
    }, 200); // 200 is the shortest interval that i tested that would reliably keep the page we're leaving
             // in chrome's browser history
    return <p>Redirecting...</p>;
};

export default RedirectWithOTP;