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
import { cartApi } from './features/api/cart';
import { downloadExcelApi } from './features/api/download-excel';
import compareStoneReducer from './features/compare-stone/compare-stone-slice';
import notificationBadgeReducer from './features/notification/notification-slice';
import searchListReducer from './features/search/search-list';
import previousSearchReducer from './features/previous-search/previous-search';
import savedSearchReducer from './features/saved-search/saved-search';

const rootReducer = combineReducers({
  compareStone: compareStoneReducer,
  notificationBadge: notificationBadgeReducer,
  searchList: searchListReducer,
  previousSearch: previousSearchReducer,
  savedSearch: savedSearchReducer,
  [downloadExcelApi.reducerPath]: downloadExcelApi.reducer,
  [savedSearchesApi.reducerPath]: savedSearchesApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
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
        downloadExcelApi.middleware,
        cartApi.middleware,
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
