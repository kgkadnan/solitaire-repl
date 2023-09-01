import { configureStore } from '@reduxjs/toolkit';
import { savedSearchesApi } from './slices/savedSearchesSlice';
import { previousSearchApi } from './slices/previousSearchSlice';


const store = configureStore({
  reducer: {
    [savedSearchesApi.reducerPath]: savedSearchesApi.reducer,
    [previousSearchApi.reducerPath]: previousSearchApi.reducer,
   }
});

// export default the store
export default store;
