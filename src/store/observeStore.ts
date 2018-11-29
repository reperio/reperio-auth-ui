import {Store} from "redux";

export function observeStore<T>(store: Store<object>, select: (state: any) => T, onChange: (state: T) => void) {
    let currentState: any;

    function handleChange() {
        const nextState = select(store.getState());
        if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState);
        }
    }

    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}