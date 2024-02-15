import {
  KYC_INDEX_MATCH,
  PATH_SEPARATOR
} from '@/constants/validation-regex/regex';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stockNo: true,
  shape: true,
  carat: true,
  color: true,
  clarity: true,
  cut: true,
  polish: true,
  symmetry: true,
  fluorescence: true,
  measurements: true,
  table: true,
  depth: true,
  rapVal: true,
  rap: true,
  disc: true,
  prct: true,
  amt: true,
  publicURL: true
};

const setNestedValue = (obj: any, path: string, value: string | string[]) => {
  const keys = path.split(PATH_SEPARATOR).filter(Boolean); // Split by '.', '[', and ']' and filter out empty strings
  const lastKey = keys.pop();

  let currentObj = obj;

  // Traverse the object based on the path
  keys.forEach(key => {
    // Handle array indices
    const indexMatch = key.match(KYC_INDEX_MATCH);
    if (indexMatch) {
      const [, arrayKey, arrayIndex] = indexMatch;
      if (arrayIndex !== undefined) {
        currentObj = currentObj[arrayKey] = currentObj[arrayKey] || [];
        currentObj = currentObj[arrayIndex] = currentObj[arrayIndex] || {};
      } else {
        currentObj = currentObj[arrayKey] = currentObj[arrayKey] || {};
      }
    } else {
      currentObj = currentObj[key] = currentObj[key] || {};
    }
  });

  // Set the property at the specified key to the specified value
  currentObj[lastKey!] = value;
};
const shareSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateShare: (state: any, action) => {
      const { name, value } = action.payload;
      setNestedValue(state, name, value);
    }
  }
});

export const { updateShare } = shareSlice.actions;
export default shareSlice.reducer;
