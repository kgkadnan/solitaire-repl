import { manageListingSequenceApi } from '@/features/api/manage-listing-sequence';
import { changePasswordApi } from '@/features/api/change-password';
import { downloadExcelApi } from '@/features/api/download-excel';
import { cartApi } from '@/features/api/cart';
import { savedSearchesApi } from '@/features/api/saved-searches';
import { notificationApi } from '@/features/api/notification';
import { notificationSettingApi } from '@/features/api/notification-setting';
import { productApi } from '@/features/api/product';
import { loginApi } from '@/features/api/login';
import { myDiamondApi } from '@/features/api/my-diamonds/my-diamond';
import { registerApi } from '@/features/api/register';
import { resetPasswordApi } from '@/features/api/reset-password';
import { verifyEmailApi } from '@/features/api/verify-email';
import { currentIPApi } from '@/features/api/current-ip';
import { forgotPasswordApi } from '@/features/api/forgot-password';
import { kycApi } from '@/features/api/kyc';
import { otpVerificationApi } from '@/features/api/otp-verification';
import { downloadInvoiceApi } from '@/features/api/download-invoice';
import { getAllCountryCodeApi } from '@/features/api/get-country-code';
import { dashboardApi } from '@/features/api/dashboard';
import publicApi from '@/features/api/public';
import { manageSubscriptionApi } from '@/features/api/manage-subscription';
import { myAccountApi } from '@/features/api/my-account';
import { newNotificationApi } from '@/features/api/notification/notification';
import { faqsApi } from '@/features/api/faqs';
import { myAppointmentApi } from '@/features/api/my-appointments';
import { setupStore } from '@/store';

// Define a function to reset all API states
const resetAllApiStates = () => {
  const store = setupStore(); // Create a store instance

  store.dispatch(
    manageListingSequenceApi.util.invalidateTags(['manageListingSequence'])
  );
  store.dispatch(manageListingSequenceApi.util.resetApiState());

  store.dispatch(changePasswordApi.util.resetApiState());
  store.dispatch(downloadExcelApi.util.resetApiState());
  store.dispatch(cartApi.util.resetApiState());
  store.dispatch(savedSearchesApi.util.resetApiState());
  store.dispatch(notificationApi.util.resetApiState());
  //   store.dispatch(notificationApi.util.invalidateTags(['notification']));

  store.dispatch(notificationSettingApi.util.resetApiState());
  store.dispatch(productApi.util.resetApiState());
  store.dispatch(loginApi.util.resetApiState());
  store.dispatch(myDiamondApi.util.resetApiState());
  store.dispatch(registerApi.util.resetApiState());
  store.dispatch(resetPasswordApi.util.resetApiState());
  store.dispatch(verifyEmailApi.util.resetApiState());
  store.dispatch(currentIPApi.util.resetApiState());
  store.dispatch(forgotPasswordApi.util.resetApiState());
  store.dispatch(kycApi.util.resetApiState());
  store.dispatch(otpVerificationApi.util.resetApiState());
  store.dispatch(downloadInvoiceApi.util.resetApiState());
  store.dispatch(getAllCountryCodeApi.util.resetApiState());
  store.dispatch(dashboardApi.util.resetApiState());
  store.dispatch(dashboardApi.util.invalidateTags(['dashboard']));

  store.dispatch(publicApi.util.resetApiState());
  store.dispatch(manageSubscriptionApi.util.resetApiState());
  store.dispatch(myAccountApi.util.resetApiState());
  store.dispatch(newNotificationApi.util.invalidateTags(['notification']));

  // store.dispatch(newNotificationApi.util.resetApiState());
  store.dispatch(faqsApi.util.resetApiState());
  store.dispatch(myAppointmentApi.util.resetApiState());
};

export default resetAllApiStates;
