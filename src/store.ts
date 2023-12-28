import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';

import { notificationSettingApi } from './features/api/notification-setting';
import { savedSearchesApi } from './features/api/saved-searches';
import { notificationApi } from './features/api/notification';
import { productApi } from './features/api/product';
import { loginApi } from './features/api/login';
import { cartApi } from './features/api/cart';
import { downloadExcelApi } from './features/api/download-excel';
import notificationBadgeReducer from './features/notification/notification-slice';
import searchResultReducer from './features/search-result/search-result';
import searchListReducer from './features/search/search-list';
import savedSearchReducer from './features/saved-search/saved-search';
import { changePasswordApi } from './features/api/change-password';
import { manageListingSequenceApi } from './features/api/manage-listing-sequence';
import { myDiamondAPI } from './features/api/my-diamonds/my-diamond';
import { registerApi } from './features/api/register';
import { currentIPApi } from './features/api/current-ip';
import { forgotPasswordApi } from './features/api/forgot-password';
import kycReducer from './features/kyc/kyc';
import { kycApi } from './features/api/kyc';

const rootReducer = combineReducers({
  notificationBadge: notificationBadgeReducer,
  searchResult: searchResultReducer,
  searchList: searchListReducer,
  savedSearch: savedSearchReducer,
  kyc: kycReducer,
  [downloadExcelApi.reducerPath]: downloadExcelApi.reducer,
  [currentIPApi.reducerPath]: currentIPApi.reducer,
  [manageListingSequenceApi.reducerPath]: manageListingSequenceApi.reducer,
  [savedSearchesApi.reducerPath]: savedSearchesApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [changePasswordApi.reducerPath]: changePasswordApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [notificationSettingApi.reducerPath]: notificationSettingApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
  [myDiamondAPI.reducerPath]: myDiamondAPI.reducer,
  [kycApi.reducerPath]: kycApi.reducer
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware().concat(
        manageListingSequenceApi.middleware,
        changePasswordApi.middleware,
        downloadExcelApi.middleware,
        cartApi.middleware,
        savedSearchesApi.middleware,
        notificationApi.middleware,
        notificationSettingApi.middleware,
        productApi.middleware,
        loginApi.middleware,
        myDiamondAPI.middleware,
        registerApi.middleware,
        currentIPApi.middleware,
        forgotPasswordApi.middleware,
        kycApi.middleware
      ),
    preloadedState
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
