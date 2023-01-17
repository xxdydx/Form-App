import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import html2pdf from "html2pdf.js";
import Delete from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../../../../reducers/notificationReducer";
import { deleteSubmission } from "../../../../reducers/formReducer";
import { useSelector } from "react-redux";
import Question from "./Question";
import OtherInfo from "./OtherInfo";

const FAPreview = ({ form }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (form === undefined) {
    return null;
  }
  console.log(form.title);
  const questions = form.questions;
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
      jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
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
      <div className="flex justify-between px-4 mx-auto max-w-7xl ">
        <article className="mx-auto w-full max-w-7xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
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
            <div className="">
              <h1 class="float-left  text-2xl mb-2 tracking-tight font-bold text-gray-900 dark:text-white">
                {form.title}
              </h1>
              <h1 class="float-right text-2xl mb-2 tracking-tight text-right text-gray-900 dark:text-white">
                {form.company}
              </h1>
            </div>

            <table class="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-sm text-black  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td
                    scope="col"
                    class="border border-black font-bold text-sm text-center w-4/12 py-2 px-3 "
                    colspan="6"
                  >
                    First Aid Box
                  </td>

                  <td
                    scope="col"
                    class="border border-black w-2/12 py-2 px-3 "
                    colspan="3"
                  >
                    Year: {new Date(form.dateOfForm).getFullYear()}
                  </td>

                  <td
                    scope="col"
                    class="border border-black w-6/12 py-2 px-3"
                    colspan="9"
                  >
                    Location: {form.location}
                  </td>
                </tr>
                <tr>
                  <td
                    scope="col"
                    class="border border-black font-bold text-sm text-center w-1/12 py-2 px-3 "
                    rowspan="2"
                  >
                    S/N
                  </td>
                  <td
                    scope="col"
                    class="border border-black font-bold text-sm text-center w-2/12 py-2 px-3 "
                    rowspan="2"
                    colspan="4"
                  >
                    Contents
                  </td>
                  <td
                    scope="col"
                    class="border border-black font-bold text-sm text-center w-1/12 py-2 px-3 "
                    rowspan="2"
                  >
                    Qty
                  </td>

                  <td
                    scope="col"
                    class="border border-black w-8/12 py-2 text-sm text-center font-bold uppercase "
                    colspan="12"
                  >
                    Monthly Checklist
                  </td>
                </tr>
                <tr>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2 "
                  >
                    Jan
                  </td>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2 "
                  >
                    Feb
                  </td>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2"
                  >
                    Mar
                  </td>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2"
                  >
                    Apr
                  </td>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2 "
                  >
                    May
                  </td>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2"
                  >
                    Jun
                  </td>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2"
                  >
                    Jul
                  </td>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2"
                  >
                    Aug
                  </td>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2"
                  >
                    Sep
                  </td>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2"
                  >
                    Oct
                  </td>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2 "
                  >
                    Nov
                  </td>
                  <td
                    scope="col"
                    class="border border-black text-sm text-center  py-2"
                  >
                    Dec
                  </td>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <Question
                    key={question.id}
                    question={question}
                    id={form.id}
                  />
                ))}
                <OtherInfo id={form.id} />
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </main>
  );
};

export default FAPreview;
