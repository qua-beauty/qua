import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    geo: null
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setUserGeo: (state, action) => {
      state.geo = action.payload;
    },
    clearUser: (state, action) => {
      state.data = null;
    }
  }
});

export const {setUser, clearUse, setUserGeo} = userSlice.actions;
export const userReducer = userSlice.reducer;