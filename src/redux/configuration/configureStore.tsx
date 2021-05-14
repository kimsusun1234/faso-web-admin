import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './rootReducer';
import rootSagas from './rootSagas';

const config = {
  key: 'root',
  timeout: 0,
  storage:storage,
  blacklist: ['AppConfigReducer', 'ServiceReducer'],
  debug: true,
};
const sagaMiddleware = createSagaMiddleware();
const middleware = [];
middleware.push(sagaMiddleware);
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
} else {
  // production code
}
const reducers = persistReducer(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig = {enhancers};
const store = createStore(
  reducers,
  undefined,
  compose(...enhancers),
);
const persistor = persistStore(store, persistConfig as any, () => {});
const configureStore = () => {
  return {persistor, store};
};
sagaMiddleware.run(rootSagas);
export default configureStore;
