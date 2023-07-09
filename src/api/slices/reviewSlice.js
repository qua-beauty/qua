import {createSelector, createSlice} from '@reduxjs/toolkit';

export const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    data: null,
    current: null
  },
  reducers: {
    setReviewsData: (state, action) => {
      state.data = action.payload;
    },
    setCurrentReview: (state, action) => {
      state.current = action.payload;
    }
  }
});

const reviewSelector = (state) => state.reviews;

export const selectReviewsByShop = (shop) => (
  createSelector(reviewSelector, (reviews) => {
    if(!reviews?.data) return [];

    const shopReviews = reviews.data.filter((p) => {
      return p.shop.id === shop
    });

    return shopReviews;  
  })
)

export const {setReviewsData, setCurrentReview} = reviewSlice.actions;
export const reviewReducer = reviewSlice.reducer;