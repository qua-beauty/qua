import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    clearUser: (state, action) => {
      state.data = null;
    }
  }
});

export const {setUser, clearUser} = userSlice.actions;
export const userReducer = userSlice.reducer;