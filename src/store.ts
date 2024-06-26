import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';

import { savedSearchesApi } from './features/api/saved-searches';

import { productApi } from './features/api/product';
import { loginApi } from './features/api/login';
import { cartApi } from './features/api/cart';
import { downloadExcelApi } from './features/api/download-excel';
import notificationBadgeReducer from './features/notification/notification-slice';
import profileUpdateReducer from './features/profile/profile-update-slice';
import isEditingKycSlice from './features/kyc/is-editing-kyc';
import searchResultReducer from './features/search-result/search-result';
import searchListReducer from './features/search/search-list';
import savedSearchReducer from './features/saved-search/saved-search';
import { changePasswordApi } from './features/api/change-password';
import { manageListingSequenceApi } from './features/api/manage-listing-sequence';
import { yourOrderApi } from './features/api/your-order';
import { registerApi } from './features/api/register';
import { resetPasswordApi } from './features/api/reset-password';
import { currentIPApi } from './features/api/current-ip';
import { forgotPasswordApi } from './features/api/forgot-password';
import kycReducer from './features/kyc/kyc';
import LogoutReducer from './features/logout/logout-slice';

import { kycApi } from './features/api/kyc';
import { otpVerificationApi } from './features/api/otp-verification';
import { verifyEmailApi } from './features/api/verify-email';
import { downloadInvoiceApi } from './features/api/download-invoice';
import { getAllCountryCodeApi } from './features/api/get-country-code';
import { dashboardApi } from './features/api/dashboard';

import { manageSubscriptionApi } from './features/api/manage-subscription';
import { myProfileApi } from './features/api/my-profile';
import { notificationApi } from './features/api/notification';
import { faqsApi } from './features/api/faqs';
import { myAppointmentApi } from './features/api/my-appointments';
import { statusCode } from './constants/enums/status-code';
import { show } from './features/logout/logout-slice';
import { copyURLApi } from './features/api/track-public-url-copy';
import { trackApi } from './features/api/track-interaction';

const rootReducer = combineReducers({
  notificationBadge: notificationBadgeReducer,
  profileUpdate: profileUpdateReducer,
  isEditingKYC: isEditingKycSlice,
  searchResult: searchResultReducer,
  searchList: searchListReducer,
  savedSearch: savedSearchReducer,
  kyc: kycReducer,
  logoutAll: LogoutReducer,
  [downloadExcelApi.reducerPath]: downloadExcelApi.reducer,
  [currentIPApi.reducerPath]: currentIPApi.reducer,
  [manageListingSequenceApi.reducerPath]: manageListingSequenceApi.reducer,
  [savedSearchesApi.reducerPath]: savedSearchesApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [changePasswordApi.reducerPath]: changePasswordApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [forgotPasswordApi.reducerPath]: forgotPasswordApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
  [yourOrderApi.reducerPath]: yourOrderApi.reducer,
  [kycApi.reducerPath]: kycApi.reducer,
  [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
  [verifyEmailApi.reducerPath]: verifyEmailApi.reducer,
  [otpVerificationApi.reducerPath]: otpVerificationApi.reducer,
  [downloadInvoiceApi.reducerPath]: downloadInvoiceApi.reducer,
  [getAllCountryCodeApi.reducerPath]: getAllCountryCodeApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [manageSubscriptionApi.reducerPath]: manageSubscriptionApi.reducer,
  [myProfileApi.reducerPath]: myProfileApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [faqsApi.reducerPath]: faqsApi.reducer,
  [myAppointmentApi.reducerPath]: myAppointmentApi.reducer,
  [copyURLApi.reducerPath]: copyURLApi.reducer,
  [trackApi.reducerPath]: trackApi.reducer
});

const handle410Middleware =
  (storeAPI: any) => (next: any) => async (action: any) => {
    const result = await next(action);
    if (result?.payload?.status === statusCode.LOGOUT) {
      storeAPI.dispatch(show()); // Dispatch action to show modal
    }

    return result;
  };

export default handle410Middleware;

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
        productApi.middleware,
        loginApi.middleware,
        yourOrderApi.middleware,
        registerApi.middleware,
        resetPasswordApi.middleware,
        verifyEmailApi.middleware,
        currentIPApi.middleware,
        forgotPasswordApi.middleware,
        kycApi.middleware,
        otpVerificationApi.middleware,
        downloadInvoiceApi.middleware,
        getAllCountryCodeApi.middleware,
        dashboardApi.middleware,
        manageSubscriptionApi.middleware,
        myProfileApi.middleware,
        notificationApi.middleware,
        faqsApi.middleware,
        myAppointmentApi.middleware,
        copyURLApi.middleware,
        trackApi.middleware,
        handle410Middleware
      ),
    preloadedState
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
