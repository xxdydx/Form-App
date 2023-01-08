import { Checkbox } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "flowbite-react";
import { useState } from "react";
import { updateQuestion } from "../../../../reducers/sampleFormReducer";

const Question = ({ question, id }) => {
  const dispatch = useDispatch();
  const sampleForms = useSelector((state) => state.sampleForms);

  const form = sampleForms.find((form) => form.id === id);
  const questions1 = form.questions;

  const index = questions1.findIndex((qn) => qn.id === question.id);
  const AnswerOnChange = (event) => {
    const updatedQuestion = {
      ...question,
      answer: event.target.checked ? "Yes" : "No",
    };
    const updatedForm = {
      title: form.title,
      questions: [
        ...form.questions.map((item) =>
          item.id === updatedQuestion.id ? updatedQuestion : item
        ),
      ],
      logo: form.logo,
      type: form.type,
      id: id,
    };
    dispatch(updateQuestion(updatedForm));
  };

  return (
    <div className="py-2 w-1/2">
      <div className="flex items-center gap-2">
        <p className="w-3/4">
          {index + 1}. {question.content}
        </p>
        <div className="w-1/4">
          <Checkbox
            onChange={AnswerOnChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Question;
