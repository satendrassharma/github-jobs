import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import { FETCH_JOBS_FAILED, FETCH_JOBS_SUCCESS } from "./actions/types";

const blockPreviousRequestMiddleWare = store => next => action => {
  if (action.type === FETCH_JOBS_SUCCESS || action.type === FETCH_JOBS_FAILED) {
    console.group("request");
    console.log("received request id: ", action.payload.id);
    console.log("current id: ", store.getState().jobs.id);
    console.log("is equal: ", action.payload.id === store.getState().jobs.id);
    console.groupEnd("request end");

    const requestid = action.payload.id;
    const currentid = store.getState().jobs.id;

    if (requestid === currentid || currentid === null) {
      next(action);
    } else {
      console.log("request id:" + requestid + " is blocked");
    }
  } else {
    next(action);
  }
};

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, blockPreviousRequestMiddleWare];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const persistConfig = {
    key: "root",
    storage
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
