import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "foods",
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.find((r) => r.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = foodSlice.actions;
export default foodSlice.reducer;
