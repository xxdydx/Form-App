import { useSelector } from "react-redux";
import { createSubmission } from "../../../reducers/formReducer";
import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import html2pdf from "html2pdf.js";
import Section from "./Section";
import Delete from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../../../reducers/notificationReducer";
import { deleteSubmission } from "../../../reducers/formReducer";

const SubmissionView = ({ form }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (form === undefined) {
    return null;
  }
  const questions = form.questions;
  const sections1 = questions.map((question) => question.section);
  const sections = [...new Set(sections1)];
  const handleClick = (event) => {
    const element = document.getElementById("form");
    html2pdf(element, {
      margin: 0.5,
      filename: "form.pdf",
      image: { type: "png", quality: 1 },
      html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      jsPDF: { unit: "in", format: "a4" },
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Do you want to delete this submission?`)) {
      try {
        await dispatch(deleteSubmission(id));
        const notif = {
          message: "Successfully deleted submission",
          type: "success",
        };
        dispatch(setNotification(notif, 5000));
        navigate("/submissions");
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
      <div className="flex justify-between px-4 mx-auto max-w-6xl ">
        <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <Button className="h-3 w-30" onClick={handleClick}>
                <PictureAsPdfIcon className="mr-2 h-2.5 w-2.5" />
                Create PDF
              </Button>
              <Button
                onClick={() => handleDelete(form.id)}
                className="h-3 w-30"
                color="failure"
              >
                <Delete className="mr-2 h-2.5 w-2.5" />
                Delete
              </Button>
            </div>

            <address className="flex items-center mb-6 not-italic"></address>
          </header>

          <div id="form" class="overflow-x-auto relative">
            <h1 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
              {form.title}
            </h1>
            {sections.map((section, i) => (
              <Section key={i} section={section} form={form} />
            ))}
          </div>
        </article>
      </div>
    </main>
  );
};

export default SubmissionView;
