import { useSelector } from "react-redux";
import Section from "./Section";
import { createSubmission } from "../../../reducers/formReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeSampleForms } from "../../../reducers/sampleFormReducer";
import { Button, Label, TextInput } from "flowbite-react";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../../../reducers/notificationReducer";
import { VscEdit } from "react-icons/vsc";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteForm } from "../../../reducers/sampleFormReducer";
import { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

const FormView = ({ form }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sampleForms = useSelector((state) => state.sampleForms);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const sigCanvas = useRef();
  if (form === undefined) {
    return null;
  }

  const form1 = sampleForms.find((form2) => form2.id === form.id);

  const questionsToSubmit = form.questions;
  const sections1 = questionsToSubmit.map((question) => question.section);
  const sections = [...new Set(sections1)];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sign = sigCanvas.current.getCanvas().toDataURL("image/png");
    const newFormSubmission = new FormData();
    newFormSubmission.append("title", form.title);
    newFormSubmission.append("logo", form.logo);
    newFormSubmission.append("dateSubmitted", JSON.stringify(new Date()));
    newFormSubmission.append("signature", sign);
    newFormSubmission.append("name", name);
    newFormSubmission.append("company", company);
    newFormSubmission.append("jobTitle", jobTitle);
    newFormSubmission.append("questions", JSON.stringify(form1.questions));

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
            {sections.map((section, i) => (
              <Section key={i} section={section} form={form} />
            ))}
            <div className="flex flex-col gap-4 pb-12">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Name" />
                </div>
                <TextInput
                  id="small"
                  type="text"
                  sizing="sm"
                  onChange={({ target }) => setName(target.value)}
                  required={true}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Company" />
                </div>
                <TextInput
                  id="small"
                  type="text"
                  sizing="sm"
                  onChange={({ target }) => setCompany(target.value)}
                  required={true}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Job Title" />
                </div>
                <TextInput
                  id="small"
                  type="text"
                  sizing="sm"
                  onChange={({ target }) => setJobTitle(target.value)}
                  required={true}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Signature" className="mb-4" />
                </div>
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    width: 250,
                    height: 100,
                    className: "border border-black sigCanvas",
                  }}
                  ref={sigCanvas}
                  required={true}
                />
                <Button
                  size="xs"
                  className="mt-4"
                  onClick={() => sigCanvas.current.clear()}
                  color="failure"
                >
                  Clear
                </Button>
              </div>
            </div>

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
