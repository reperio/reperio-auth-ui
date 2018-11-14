import { observeStore } from "./observeStore";
import {LocalStorageService} from "../services/localStorageService";
import {Dispatch, StoreEnhancerStoreCreator} from "redux";

declare const PERMITTED_POST_MESSAGE_ORIGINS: string[];

type updateValueMethodType = (newValue: string) => (dispatch: Dispatch<any>, getState: () => any) => void;

export const postMessageEnhancer = <T>(updateValue: updateValueMethodType, localStorageService: LocalStorageService, name: string, select: (state: any) => T) => (next: StoreEnhancerStoreCreator<any>) => (...storeCreatorArgs: any[]) => {
    const store = (next as any)(...storeCreatorArgs);

    localStorageService.subscribe((newValue: string, source: "internal" | "external") => {
        if (source === "external") {
            updateValue(newValue)(store.dispatch, store.getState);
        }
    });

    const postMessageSources = new Map<Window, {source: Window, origin: string}>();
    window.addEventListener("message", (e) => {
        const {origin, data} = e;
        if (!PERMITTED_POST_MESSAGE_ORIGINS.includes(origin) || data == null) {
            return
        }

        const {action, subscribeTo} = data;

        if (subscribeTo === name) {
            if (action === "postMessageEnhancer/SUBSCRIBE") {
                if (postMessageSources.has(e.source)) {
                    console.log("source already subscribed");
                } else {
                    postMessageSources.set(e.source, {source: e.source, origin});
                    e.source.postMessage({
                        action: "postMessageEnhancer/UPDATED",
                        name,
                        value: select(store.getState())
                    }, origin);
                }
            }

            if (action === "postMessageEnhancer/UNSUBSCRIBE") {
                if (!postMessageSources.has(e.source)) {
                    console.log("source not subscribed");
                } else {
                    postMessageSources.delete(e.source);
                }
            }

            if (action === "postMessageEnhancer/UPDATE") {
                const {value} = data;
                updateValue(value)(store.dispatch, store.getState);
            }
        }
    });

    observeStore(store, select, value => {
        postMessageSources.forEach(({source, origin}) => source.postMessage({action: "postMessageEnhancer/UPDATED", name, value}, origin))
    });

    return store;
};

