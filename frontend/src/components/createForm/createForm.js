import { useState } from "react";
import { Button, TextInput, Label } from "flowbite-react";
import sampleFormService from "../../services/sampleForms";

const CreateForm = () => {
  const [inputQuestions, setInputQuestions] = useState({});
  const [inputSections, setInputSections] = useState({});
  const [title, setTitle] = useState("");
  const [counter, setCounter] = useState(1);

  const handleClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleOnChange = (e) => {
    const abc = {};
    console.log(e.target.key);
    abc[e.target.id] = e.target.value;
    console.log(abc);
    setInputQuestions({ ...inputQuestions, ...abc });
  };

  const handleSectionChange = (e) => {
    const abc = {};
    console.log(e.target.key);
    abc[e.target.id] = e.target.value;
    console.log(abc);
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

    const submission = {
      title: title,
      questions: questions,
    };
    try {
      await sampleFormService.create(submission);
      console.log("submitted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
      <div id="form" className="flex justify-between px-4 mx-auto max-w-6xl ">
        <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <form onSubmit={handleSubmit}>
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
                    className="flex-1 pr-2 w-11/12"
                    id={index}
                    placeholder="Question"
                    type="text"
                    sizing="md"
                    required={true}
                  />
                  <TextInput
                    className="flex-2 w-1/12"
                    key={c}
                    id={index}
                    onChange={handleSectionChange}
                    placeholder="Section"
                    required={true}
                  />
                </div>
              );
            })}
            <Button
              className="mt-4 w-30"
              onClick={handleClick}
              variant="contained"
            >
              Add Question
            </Button>
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
