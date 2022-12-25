import Question from "./Question";
import { useSelector } from "react-redux";

const Section = ({ section, form }) => {
  if (form === undefined) {
    return null;
  }
  const questions = form.questions;
  const questionsForSect = questions.filter(
    (question) => question.section === section
  );

  return (
    <div className="py-2">
      <h1 className="text-2xl pb-2 font-bold dark:text-white">
        Section {section}
      </h1>
      {questionsForSect.map((question, i) => (
        <Question key={question.id} question={question} id={form.id} />
      ))}
      <br />
    </div>
  );
};

export default Section;
