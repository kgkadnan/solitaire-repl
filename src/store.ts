import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { savedSearchesApi } from './features/api/saved-searches';
import { previousSearchApi } from './features/api/previous-searches';
import { notificationApi } from './features/api/notification';
import { productAPi } from './features/api/product';
import compareStoneReducer from './features/compare-stone/compare-stone-slice';
import { notificationSettingApi } from './features/api/notification-setting';
import { cartApi } from './slices/cart';

const rootReducer = combineReducers({
  compareStone: compareStoneReducer,
  [savedSearchesApi.reducerPath]: savedSearchesApi.reducer,
  [previousSearchApi.reducerPath]: previousSearchApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [productAPi.reducerPath]: productAPi.reducer,
  [notificationSettingApi.reducerPath]: notificationSettingApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
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
        productAPi.middleware,
        notificationSettingApi.middleware,
        cartApi.middleware
      ),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
