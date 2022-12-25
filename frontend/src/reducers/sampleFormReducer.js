import { createSlice, current } from "@reduxjs/toolkit";
import sampleFormService from "../services/sampleForms";

const sampleFormSlice = createSlice({
  name: "sampleForms",
  initialState: [],
  reducers: {
    create(state, action) {
      const question = action.payload;
      state.push(question);
    },
    edit(state, action) {
      const updatedBlog = action.payload;
      console.log(updatedBlog);
      return state.map((item) =>
        item.id === updatedBlog.id ? updatedBlog : item
      );
    },
    setSampleForms(state, action) {
      return action.payload;
    },
  },
});

export const { create, edit, setSampleForms } = sampleFormSlice.actions;

export const initializeSampleForms = () => {
  return async (dispatch) => {
    const sampleForms = await sampleFormService.getAll();
    dispatch(setSampleForms(sampleForms));
  };
};

export const updateQuestion = (updatedForm) => {
  return (dispatch) => {
    dispatch(edit(updatedForm));
  };
};

export const createForm = (formObject) => {
  return async (dispatch) => {
    const form = await sampleFormService.create(formObject);
    dispatch(create(form));
  };
};

export default sampleFormSlice.reducer;
