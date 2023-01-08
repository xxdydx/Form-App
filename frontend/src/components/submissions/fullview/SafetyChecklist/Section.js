import Question from "./Question";

const Section = ({ section, form }) => {
  if (form === undefined) {
    return null;
  }
  const questions = form.questions;

  const questionsForSect = questions.filter(
    (question) => question.section === section
  );

  return (
    <>
      <tr>
        <th
          scope="col"
          class="border border-black bg-black	text-white text-left w-1/12 py-2 px-3 "
          colspan="4"
        >
          Section {section}
        </th>
      </tr>

      {questionsForSect.map((question, i) => (
        <Question key={question.id} question={question} id={form.id} />
      ))}
    </>
  );
};

export default Section;
