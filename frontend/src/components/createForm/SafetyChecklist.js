import { useState } from "react";
import { Button, TextInput, Label, FileInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { VscRemove } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setNotification } from "../../reducers/notificationReducer";
import { createForm } from "../../reducers/sampleFormReducer";
import AWS from "aws-sdk";

const SafetyChecklist = () => {
  const [inputQuestions, setInputQuestions] = useState({});
  const [inputSections, setInputSections] = useState({});
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY,
  });

  const s3 = new AWS.S3({
    region: process.env.REACT_APP_REGION,
    bucket: process.env.REACT_APP_BUCKET_NAME,
  });

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
    console.log(file);
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
    submission.append("type", "SC");
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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <header className="my-8 lg:mb-6 not-format">
        <h1 class="mb-8 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
          Add Safety Checklist
        </h1>
        <h2 class="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
          Title of Checklist
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
              Company Banner
            </h2>
          </div>
          <FileInput
            id="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            helperText="This banner will appear on top of every PDF file. Choose a JPG/PNG file with a recommended size of 1200 x 100 pixels."
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
  );
};

export default SafetyChecklist;
