import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: {}
  },
  reducers: {
    toggleFilter: (state, action) => {
      const filterName = action.payload[0];
      const filterValue = action.payload[1];
      const filters = state.filters;

      if (filters.hasOwnProperty(filterName) && filters[filterName] === filterValue) {
        const newFilters = { ...filters };
        delete newFilters[filterName];
        state.filters = newFilters;
      } else {
        state.filters = {
          ...filters,
          [filterName]: filterValue
        };
      }
    }
  }
});

export const { toggleFilter } = filterSlice.actions;
export default filterSlice.reducer;