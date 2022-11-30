import { combineReducers, createStore } from "redux";
import { rootReducer } from "./rootReducer";

const initialState = {
    rootReducer: {
        cartItem: localStorage.getItem("cartItem")
            ? JSON.parse(localStorage.getItem("cartItem"))
            : [],
    },
};

const finalReducer = combineReducers({
    rootReducer: rootReducer,
});

export const store = createStore(finalReducer, initialState);
