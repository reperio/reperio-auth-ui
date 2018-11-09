import {Store} from "redux";
import {State} from "./state";

export function observeStore<T>(store: Store<object>, select: (state: State) => T, onChange: (state: T) => void) {
    let currentState: any;

    function handleChange() {
        const nextState = select(store.getState() as State);
        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}