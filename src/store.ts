import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { savedSearchesApi } from './slices/saved-searches';
import { previousSearchApi } from './slices/previous-searches';
import { notificationApi } from './slices/notification';
import { notificationSettingApi } from './slices/notification-setting';

const rootReducer = combineReducers({
  [savedSearchesApi.reducerPath]: savedSearchesApi.reducer,
  [previousSearchApi.reducerPath]: previousSearchApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [notificationSettingApi.reducerPath]: notificationSettingApi.reducer,
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
        notificationSettingApi.middleware
      ),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
// export default the store
