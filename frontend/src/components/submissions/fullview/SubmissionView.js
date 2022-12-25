import { useSelector } from "react-redux";
import { createSubmission } from "../../../reducers/formReducer";
import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import html2pdf from "html2pdf.js";
import Section from "./Section";

const SubmissionView = ({ form }) => {
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

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between px-4 mx-auto max-w-6xl ">
        <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <Button onClick={handleClick}>Create PDF</Button>

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
