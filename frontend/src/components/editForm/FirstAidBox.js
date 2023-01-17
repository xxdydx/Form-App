import { useState } from "react";
import { Button, TextInput, Label, FileInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { VscRemove } from "react-icons/vsc";
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setNotification } from "../../reducers/notificationReducer";
import { updateForm } from "../../reducers/sampleFormReducer";

const FirstAidBox = ({ form }) => {
  const [inputQuestions, setInputQuestions] = useState({});
  const [inputQuantities, setInputQuantities] = useState({});
  const [originalQuestions, setOriginalQns] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (form === undefined) {
    return null;
  }
  const qns1 = form.questions;
  if (form && title === "") {
    setTitle(form.title);
    setLocation(form.location);
    setOriginalQns(qns1);
    setCounter(form.questions.length);
    setCompany(form.company ? form.company : "");
    var abc = {};
    for (var i = 0; i < form.questions.length; i++) {
      abc[i] = qns1[i].content;
    }
    var def = {};
    for (var i = 0; i < form.questions.length; i++) {
      def[i] = qns1[i].quantity;
    }

    setInputQuestions(abc);
    setInputQuantities(def);
  }

  const handleAddClick = () => {
    setCounter(counter + 1);
    const qnObj = {
      content: "",
      quantity: "",
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
      def[i] = originalQuestions[i].quantity;
    }

    setInputQuestions(abc);
    setInputQuantities(def);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleOnChange = (e) => {
    const abc = {};
    abc[e.target.id] = e.target.value;
    setInputQuestions({ ...inputQuestions, ...abc });
  };
  const handleQuantityChange = (e) => {
    const abc = {};
    abc[e.target.id] = e.target.value;
    setInputQuantities({ ...inputQuantities, ...abc });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rawQuestions = Object.values(inputQuestions);
    const rawQuantities = Object.values(inputQuantities);
    var questions = [];
    for (var i = 0; i < rawQuestions.length; i++) {
      questions.push({
        content: rawQuestions[i],
        quantity: rawQuantities[i],
        answer: "",
      });
    }

    const submission = new FormData();
    console.log(company);
    submission.append("title", title);
    submission.append("location", location);
    submission.append("company", company);
    submission.append("type", "FA");
    submission.append("questions", JSON.stringify(questions));

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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <header className="my-8 lg:mb-6 not-format">
              <h1 class="mb-8 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                Edit First Aid Box Checklist
              </h1>
              <h2 class="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
                Title of Checklist
              </h2>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                value={title}
                onChange={handleTitleChange}
                required={true}
              />

              <div className="flex flex-col gap-4 pt-6 ">
                <div>
                  <h2 class="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
                    Location
                  </h2>
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    value={location}
                    onChange={({ target }) => setLocation(target.value)}
                    required={true}
                  />
                </div>
                <div>
                  <h2 class="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white">
                    Company Name
                  </h2>
                  <TextInput
                    id="base"
                    type="text"
                    sizing="sm"
                    onChange={({ target }) => setCompany(target.value)}
                  />
                </div>
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
                    placeholder="Item"
                    type="text"
                    sizing="md"
                    required={true}
                  />
                  <TextInput
                    className="flex-2 w-2/12"
                    defaultValue={qn.quantity}
                    id={index}
                    onChange={handleQuantityChange}
                    placeholder="Quantity"
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

export default FirstAidBox;
