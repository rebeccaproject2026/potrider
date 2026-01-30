import { configureStore } from "@reduxjs/toolkit";

// Placeholder reducer so store is valid (required by Redux)
const placeholderReducer = (state = {}) => state;

const store = configureStore({
  reducer: {
    _placeholder: placeholderReducer,
  },
});

export default store;