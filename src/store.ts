import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { notificationSettingApi } from './features/api/notification-setting';
import { savedSearchesApi } from './features/api/saved-searches';
import { previousSearchApi } from './features/api/previous-searches';
import { notificationApi } from './features/api/notification';
import { productApi } from './features/api/product';
import { loginApi } from './features/api/login';

import compareStoneReducer from './features/compare-stone/compare-stone-slice';

const rootReducer = combineReducers({
  compareStone: compareStoneReducer,
  [savedSearchesApi.reducerPath]: savedSearchesApi.reducer,
  [previousSearchApi.reducerPath]: previousSearchApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [notificationSettingApi.reducerPath]: notificationSettingApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware().concat(
        previousSearchApi.middleware,
        savedSearchesApi.middleware,
        notificationApi.middleware,
        notificationSettingApi.middleware,
        productApi.middleware,
        loginApi.middleware
      ),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
