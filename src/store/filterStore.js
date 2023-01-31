import {create} from 'zustand';

export const useFilterStore = create((set, get) => ({
  filters: {},
  toggleFilter: (filterName, filterValue) => {
    const filters = get().filters;

    if (filters.hasOwnProperty(filterName) && filters[filterName] === filterValue) {
      const newFilters = {...filters};
      delete newFilters[filterName];
      set({ filters: newFilters });
    } else {
      set({
        filters: {
          ...filters,
          [filterName]: filterValue
        }
      });
    }
  }
}));