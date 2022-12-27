import { useState } from "react";
import { Button, TextInput, Label, FileInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { VscRemove } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setNotification } from "../../reducers/notificationReducer";
import { createForm } from "../../reducers/sampleFormReducer";

const CreateForm = () => {
  const [inputQuestions, setInputQuestions] = useState({});
  const [inputSections, setInputSections] = useState({});
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddClick = () => {
    setCounter(counter + 1);
  };
  const handleRemoveClick = () => {
    setCounter(counter - 1);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleFileChange = (event) => {
    if (event.target.files[0].size > 2) {
      alert("File size exceeds 2MB.");
    }
    fileExt = event.target.file[0];
    setFile(event.target.files[0]);
  };

  const handleOnChange = (e) => {
    const abc = {};
    abc[e.target.id] = e.target.value;
    setInputQuestions({ ...inputQuestions, ...abc });
  };

  const handleSectionChange = (e) => {
    const abc = {};
    abc[e.target.id] = e.target.value;
    setInputSections({ ...inputSections, ...abc });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rawQuestions = Object.values(inputQuestions);
    const rawSections = Object.values(inputSections);
    var questions = [];
    for (var i = 0; i < rawQuestions.length; i++) {
      questions.push({
        content: rawQuestions[i],
        section: rawSections[i],
        answer: "",
      });
    }

    const submission = new FormData();
    submission.append("title", title);
    submission.append("logo", file);
    submission.append("questions", JSON.stringify(questions));

    try {
      await dispatch(createForm(submission));
      const notif = {
        message: `Form added.`,
        type: "success",
      };
      dispatch(setNotification(notif, 5000));
      navigate("/");
    } catch (error) {
      const notif = {
        message: `Form cannot be added due to server error.`,
        type: "failure",
      };
      dispatch(setNotification(notif, 5000));
    }
  };

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
      <div id="form" className="flex justify-between px-4 mx-auto max-w-6xl ">
        <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 class="mb-8 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                Add a Form
              </h1>
              <h2 class="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
                Title of Form
              </h2>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                onChange={handleTitleChange}
                required={true}
              />
              <div id="fileUpload">
                <div className="mb-2 block">
                  <h2 class="pt-6 pb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
                    Company Logo
                  </h2>
                </div>
                <FileInput
                  id="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                />
              </div>
            </header>
            <h2 class="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
              Questions
            </h2>

            {Array.from(Array(counter)).map((c, index) => {
              return (
                <div className="flex  py-2">
                  <TextInput
                    onChange={handleOnChange}
                    key={c}
                    className="flex-1 pr-2 w-10/12"
                    id={index}
                    placeholder="Question"
                    type="text"
                    sizing="md"
                    required={true}
                  />
                  <TextInput
                    className="flex-2 w-2/12"
                    key={c}
                    id={index}
                    onChange={handleSectionChange}
                    placeholder="Section"
                    required={true}
                  />
                </div>
              );
            })}
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <Button onClick={handleAddClick} color="success">
                <VscAdd className="h-4 w-4" />
              </Button>
              {counter > 1 ? (
                <Button onClick={handleRemoveClick} color="failure">
                  <VscRemove className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
            <Button className="mt-4 w-30" type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </article>
      </div>
    </main>
  );
};

export default CreateForm;
