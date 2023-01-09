import { useSelector } from "react-redux";
import Question from "./Question";
import { createSubmission } from "../../../../reducers/formReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeSampleForms } from "../../../../reducers/sampleFormReducer";
import { Button, Label, TextInput } from "flowbite-react";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../../../../reducers/notificationReducer";
import { VscEdit } from "react-icons/vsc";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteForm } from "../../../../reducers/sampleFormReducer";
import { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";
import FirstAidBox from "../../../createForm/FirstAidBox";

const FirstAidBoxView = ({ form }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (form === undefined) {
    return null;
  }

  const questions = form.questions;
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newFormSubmission = new FormData();
    newFormSubmission.append("title", form.title);
    newFormSubmission.append("type", form.type);
    newFormSubmission.append("logo", form.logo);
    newFormSubmission.append("dateSubmitted", JSON.stringify(new Date()));
    newFormSubmission.append("location", form.location);
    newFormSubmission.append("questions", JSON.stringify(form.questions));

    try {
      await dispatch(createSubmission(newFormSubmission));

      const notif = {
        message: `Form submitted`,
        type: "success",
      };
      dispatch(setNotification(notif, 5000));
      navigate("/submissions");
    } catch (error) {
      const notif = {
        message: `Form cannot be added. ${error}`,
        type: "failure",
      };
      console.log(error.message);
      dispatch(setNotification(notif, 5000));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Do you want to delete this form?`)) {
      try {
        await dispatch(deleteForm(id));
        const notif = {
          message: "Successfully deleted form",
          type: "success",
        };
        dispatch(setNotification(notif, 5000));
        navigate("/");
      } catch (error) {
        const notif = {
          message: error.message,
          type: "error",
        };
        dispatch(setNotification(notif, 5000));
      }
    }
  };

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
      <div id="form" className="flex justify-between px-4 mx-auto max-w-6xl ">
        <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <h1 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
              {form.title}
            </h1>
            <p>Location: {form.location}</p>

            <div className="flex flex-wrap items-center gap-2 mt-6">
              <Button
                href={`/forms/edit/${form.id}`}
                className="h-3 w-24"
                color="warning"
              >
                <EditIcon className="mr-2 h-3 w-3" />
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(form.id)}
                className="h-3 w-24"
                color="failure"
              >
                <DeleteIcon className="mr-2 h-3 w-3" />
                Delete
              </Button>
            </div>
            <address className="flex items-center mb-6 not-italic"></address>
          </header>
          <form onSubmit={handleSubmit}>
            {questions.map((question) => (
              <Question key={question.id} question={question} id={form.id} />
            ))}

            <Button className="mt-4 w-24" type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </article>
      </div>
    </main>
  );
};

export default FirstAidBoxView;
