import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./root.reducer";
import logger from "redux-logger";

const middlewares = [logger];

const composedEnhanchers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhanchers);
