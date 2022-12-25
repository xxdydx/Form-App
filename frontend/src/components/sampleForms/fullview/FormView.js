import { useSelector } from "react-redux";
import Section from "./Section";
import { createSubmission } from "../../../reducers/formReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeSampleForms } from "../../../reducers/sampleFormReducer";
import { Button } from "flowbite-react";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../../../reducers/notificationReducer";

const FormView = ({ form }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sampleForms = useSelector((state) => state.sampleForms);
  const form1 = sampleForms.find((form2) => form2.id === form.id);
  if (form === undefined) {
    return null;
  }
  const questionsToSubmit = form.questions;
  const sections1 = questionsToSubmit.map((question) => question.section);
  const sections = [...new Set(sections1)];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newFormSubmission = {
      title: form.title,
      dateSubmitted: new Date(),
      questions: form1.questions,
    };
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
      dispatch(setNotification(notif, 5000));
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
            <address className="flex items-center mb-6 not-italic"></address>
          </header>
          <form onSubmit={handleSubmit}>
            {sections.map((section, i) => (
              <Section key={i} section={section} form={form} />
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

export default FormView;
