import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

export default (initialState = {}) => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== "production") middlewares.push(createLogger());
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
  return store;
};
