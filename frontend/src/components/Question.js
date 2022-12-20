import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateQuestion } from "../reducers/sampleFormReducer";

const Question = ({ question, id }) => {
  const dispatch = useDispatch();
  const sampleForms = useSelector((state) => state.sampleForms);
  const form = sampleForms.find((form) => form.id === id);
  const onChange = (event) => {
    const updatedQuestion = {
      ...question,
      answer: event.target.value,
    };
    const updatedForm = {
      title: form.title,
      questions: [
        ...form.questions.map((item) =>
          item.id === updatedQuestion.id ? updatedQuestion : item
        ),
      ],
      id: id,
    };
    dispatch(updateQuestion(updatedForm));
  };
  return (
    <>
      <p>{question.content}</p>
      <FormControl>
        <RadioGroup onChange={onChange}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
          <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Question;
