import { useState } from "react";
import { Button, TextInput, Label, FileInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { VscRemove, VscRepoForked } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setNotification } from "../../reducers/notificationReducer";
import { createForm, updateForm } from "../../reducers/sampleFormReducer";
import AWS from "aws-sdk";

const SafetyChecklist = ({ form }) => {
  const [inputQuestions, setInputQuestions] = useState({});
  const [originalQuestions, setOriginalQns] = useState([]);
  const [inputSections, setInputSections] = useState({});
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [counter, setCounter] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (form === undefined) {
    return null;
  }
  const qns1 = form.questions;
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY,
  });

  const s3 = new AWS.S3({
    region: process.env.REACT_APP_REGION,
    bucket: process.env.REACT_APP_BUCKET_NAME,
  });

  if (form && title === "") {
    setTitle(form.title);
    setOriginalQns(qns1);
    setCounter(form.questions.length);
    setFile(form.logo);
    var abc = {};
    for (var i = 0; i < form.questions.length; i++) {
      abc[i] = qns1[i].content;
    }
    var def = {};
    for (var i = 0; i < form.questions.length; i++) {
      def[i] = qns1[i].section;
    }

    setInputQuestions(abc);
    setInputSections(def);
  }
  const handleAddClick = () => {
    setCounter(counter + 1);
    const qnObj = {
      content: "",
      section: "",
      answer: "",
    };
    setOriginalQns(originalQuestions.concat(qnObj));
  };
  const handleRemoveClick = () => {
    setCounter(counter - 1);
    const qns2 = originalQuestions.slice(0, -1);
    setOriginalQns(qns2);
    var abc = {};
    for (var i = 0; i < qns2.length; i++) {
      abc[i] = originalQuestions[i].content;
    }
    var def = {};
    for (var i = 0; i < qns2.length; i++) {
      def[i] = originalQuestions[i].section;
    }

    setInputQuestions(abc);
    setInputSections(def);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check the file type
    if (!file.type.match("image.*")) {
      alert("Invalid file type. Only image files are allowed.");
      return;
    }

    // Check the file size
    if (file.size > 5242880) {
      alert("File size exceeds the maximum limit of 5MB.");
      return;
    }

    const params = {
      Key: file.name,
      Body: file,
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      ContentType: file.type,
    };

    s3.upload(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        setFile(data.Location);
      }
    });
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
    submission.append("id", form.id);

    try {
      await dispatch(updateForm(submission, form.id));
      const notif = {
        message: `Form edited.`,
        type: "success",
      };
      dispatch(setNotification(notif, 5000));
      navigate("/");
    } catch (error) {
      const notif = {
        message: `Form cannot be edited due to server error.`,
        type: "failure",
      };
      dispatch(setNotification(notif, 5000));
    }
  };

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
      <div id="form" className="flex justify-between px-4 mx-auto max-w-6xl ">
        <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <form onSubmit={handleSubmit}>
            <header className="mb-4 lg:mb-6 not-format">
              <h1 class="mb-8 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                Edit Safety Checklist
              </h1>
              <h2 class="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
                Title of Form
              </h2>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                onChange={handleTitleChange}
                value={title}
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

            {originalQuestions.map((qn, index) => {
              return (
                <div key={index} className="flex  py-2">
                  <TextInput
                    onChange={handleOnChange}
                    defaultValue={qn.content}
                    className="flex-1 pr-2 w-10/12"
                    id={index}
                    placeholder="Question"
                    type="text"
                    sizing="md"
                    required={true}
                  />
                  <TextInput
                    className="flex-2 w-2/12"
                    id={index}
                    defaultValue={qn.section}
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

export default SafetyChecklist;
