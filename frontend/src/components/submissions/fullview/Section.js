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
    <div className="py-2">
      <h1 className="text-2xl pb-4 font-bold dark:text-white">
        Section {section}
      </h1>
      <table class="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="w-1/12 py-3 px-6">
              S/N
            </th>

            <th scope="col" class="w-7/12 py-3 px-6">
              Item
            </th>

            <th scope="col" class="w-2/12 py-3 px-6"></th>
            <th scope="col" class="w-2/12 py-3 px-6">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          {questionsForSect.map((question, i) => (
            <Question key={question.id} question={question} index={i} />
          ))}
        </tbody>
      </table>

      <br />
    </div>
  );
};

export default Section;
