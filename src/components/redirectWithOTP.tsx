import React from 'react';
import queryString from 'query-string';

declare const CORE_UI_URL: string;

const RedirectWithOTP = (props: {otp: string, next?: string}): any => {
    const redirectUrl = props.next || CORE_UI_URL;

    const url = new URL(redirectUrl);
    const {origin, pathname, search, hash} = url;

    const queryParams = queryString.parse(search);
    const queryParamsWithOTP = {...queryParams, otp: props.otp};
    const newSearch = queryString.stringify(queryParamsWithOTP);
    const newSearchWithQuestionMark = newSearch.length > 0 ? `?${newSearch}` : "";

    const next = `${origin}${pathname}${newSearchWithQuestionMark}${hash}`;

    // TODO: write test to make sure that this function handles the correct building of the url, ESPECIALLY
    //       where to place the hash in relation to the search params

    setTimeout(() => {
        window.location.assign(next);
    }, 200); // 200 is the shortest interval that i tested that would reliably keep the page we're leaving
             // in chrome's browser history
    return null;
};

export default RedirectWithOTP;