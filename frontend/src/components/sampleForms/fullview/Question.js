import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "flowbite-react";
import { useState } from "react";
import { updateQuestion } from "../../../reducers/sampleFormReducer";

const Question = ({ question, id }) => {
  const dispatch = useDispatch();
  const sampleForms = useSelector((state) => state.sampleForms);
  const form = sampleForms.find((form) => form.id === id);
  const questions1 = form.questions;
  const index = questions1.findIndex((qn) => qn.id === question.id);
  const AnswerOnChange = (event) => {
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
      logo: form.logo,
      id: id,
    };
    dispatch(updateQuestion(updatedForm));
  };
  const RemarksOnChange = (event) => {
    const updatedQuestion = {
      ...question,
      remarks: event.target.value,
    };
    const updatedForm = {
      title: form.title,
      questions: [
        ...form.questions.map((item) =>
          item.id === updatedQuestion.id ? updatedQuestion : item
        ),
      ],
      logo: form.logo,
      id: id,
    };
    dispatch(updateQuestion(updatedForm));
  };
  return (
    <div className="py-2">
      <p>
        {index + 1}. {question.content}
      </p>
      <FormControl>
        <RadioGroup onChange={AnswerOnChange}>
          <FormControlLabel
            value="Yes"
            control={<Radio required={true} />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio required={true} />}
            label="No"
          />
          <FormControlLabel
            value="N/A"
            control={<Radio required={true} />}
            label="N/A"
          />
        </RadioGroup>
      </FormControl>
      {question.answer === "No" ? (
        <TextInput
          id="large"
          type="text"
          sizing="lg"
          placeholder="Remarks"
          onChange={RemarksOnChange}
          required={true}
        />
      ) : null}
    </div>
  );
};

export default Question;
