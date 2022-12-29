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
  const naming = () => {
    var checklist = form.title.replaceAll(" ", "_");
    var date = form.dateSubmitted.split("T")[0];
    var string = date.concat("_WAH_", checklist, ".pdf");
    return string;
  };

  const handleClick = (event) => {
    const element = document.getElementById("form");
    html2pdf(element, {
      margin: 0.3,
      filename: naming(),
      html2canvas: {
        scale: 1.5,
        dpi: 72,
        logging: true,
        letterRendering: true,
      },
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
            <img className="pb-6" src={`/images/${form.logo}`} />
            <h1 class="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
              {form.title}
            </h1>
            <table class="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    class="border border-black text-center w-1/12 py-2 px-3 "
                  >
                    S/N
                  </th>

                  <th scope="col" class="border border-black w-7/12 py-2 px-3 ">
                    Item
                  </th>

                  <th
                    scope="col"
                    class="border border-black w-2/12 py-2 px-3"
                  ></th>
                  <th scope="col" class="border border-black w-2/12 py-2 px-3">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section, i) => (
                  <Section key={i} section={section} form={form} />
                ))}
              </tbody>
            </table>
            <div id="info-block">
              <table class="table-fixed mt-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tr class="bg-white   dark:bg-gray-800 dark:border-gray-700">
                  <td class="border-l border-t border-black  text-black  text-sm py-2 px-3">
                    Name
                  </td>
                  <td class="border-l border-t border-black  text-black  text-sm py-2 px-3">
                    Job Title
                  </td>
                  <td class="border-l border-t border-black  text-black  text-sm py-2 px-3">
                    Date & Time
                  </td>

                  <td class="border-l border-t border-r border-black  text-black  text-sm py-2 px-3">
                    Signature
                  </td>
                </tr>
                <tr class="bg-white  dark:bg-gray-800 dark:border-gray-700">
                  <td class="border-l border-b border-black text-black text-center text-base py-2 px-3">
                    {form.name}
                  </td>
                  <td class="border-l border-b border-black text-black text-center text-base py-2 px-3">
                    {form.jobTitle}
                  </td>
                  <td class="border-l border-b border-black text-black text-center text-base py-2 px-3">
                    {new Date(form.dateSubmitted).toLocaleString("en-SG")}
                  </td>

                  <td
                    rowspan="3"
                    class="border-l border-b border-r border-black text-black text-center text-base py-2 px-3"
                  >
                    <img src={form.signature} />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default SubmissionView;
