import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../reducers/formReducer";
import sampleFormReducer from "../reducers/sampleFormReducer";
import notificationReducer from "../reducers/notificationReducer";

const store = configureStore({
  reducer: {
    sampleForms: sampleFormReducer,
    forms: formReducer,
    notifications: notificationReducer,
  },
});

export default store;
