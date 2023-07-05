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

    const shopReviews = products.data.filter((p) => {
      console.log(p.shop, shop);
      return p.shop === shop
    });

    return shopReviews;  
  })
)

export const {setReviewsData, setCurrentReview} = reviewSlice.actions;
export const ReviewReducer = reviewSlice.reducer;