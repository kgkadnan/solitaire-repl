import { configureStore } from '@reduxjs/toolkit';
import { savedSearchesApi } from './slices/savedSearchesSlice';



const store = configureStore({
  reducer: {
    [savedSearchesApi.reducerPath]: savedSearchesApi.reducer,
   },
});

// export default the store
export default store;
