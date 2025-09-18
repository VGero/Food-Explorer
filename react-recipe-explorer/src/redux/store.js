import { configureStore } from "@reduxjs/toolkit";
import foodsReducer from "./foodSlice";

const store = configureStore({
  reducer: {
    foods: foodsReducer,
  },
});

export default store;
