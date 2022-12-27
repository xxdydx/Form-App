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
      const updatedForm = action.payload;
      return state.map((item) =>
        item.id === updatedForm.id ? updatedForm : item
      );
    },
    remove(state, action) {
      const id = action.payload;
      return state.filter((forms) => forms.id !== id);
    },
    setSampleForms(state, action) {
      return action.payload;
    },
  },
});

export const { create, edit, remove, setSampleForms } = sampleFormSlice.actions;

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

export const deleteForm = (id) => {
  return async (dispatch) => {
    const response = await sampleFormService.remove(id);
    dispatch(remove(id));
  };
};

export const updateForm = (newObject, id) => {
  return async (dispatch) => {
    const response = await sampleFormService.update(newObject, id);
    dispatch(edit(response));
  };
};

export default sampleFormSlice.reducer;
