// src/reducers/index.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stores: []
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore(state, action) {
      state.stores.push(action.payload);
    }
  }
});

export const { addStore } = storeSlice.actions;
export default storeSlice.reducer;
