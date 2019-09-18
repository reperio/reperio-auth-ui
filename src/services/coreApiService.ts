import {ReperioCoreConnector} from "@reperio/core-connector";

declare const API_URL: string;

export const coreApiService = new ReperioCoreConnector({
    baseURL: API_URL
});