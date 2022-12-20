import { createSlice } from "@reduxjs/toolkit";
import formService from "../services/forms";

const formSlice = createSlice({
  name: "forms",
  initialState: [],
  reducers: {
    create(state, action) {
      const form = action.payload;
      state.push(form);
    },
    setForms(state, action) {
      return action.payload;
    },
    edit(state, action) {
      const updatedForm = action.payload;
      return state.map((item) =>
        item.id === updatedForm.id ? updatedForm : item
      );
    },
  },
});

export const { create, edit, setForms } = formSlice.actions;

export const initializeForms = () => {
  return async (dispatch) => {
    const forms = await formService.getAll();
    dispatch(setForms(forms));
  };
};

export const createSubmission = (formObject) => {
  return async (dispatch) => {
    const newSubmission = await formService.create(formObject);
    dispatch(create(newSubmission));
  };
};

export default formSlice.reducer;
