import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../reducers/formReducer";
import sampleFormReducer from "../reducers/sampleFormReducer";

const store = configureStore({
  reducer: {
    sampleForms: sampleFormReducer,
    forms: formReducer,
  },
});

export default store;
