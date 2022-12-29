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
    <div className="">
      <h1 className="text-base pb-2 font-bold dark:text-white">
        Section {section}
      </h1>
      <table class="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              class="border border-black text-center w-1/12 py-2 px-3 "
            >
              S/N
            </th>

            <th scope="col" class="border border-black w-7/12 py-2 px-3 ">
              Item
            </th>

            <th scope="col" class="border border-black w-2/12 py-2 px-3"></th>
            <th scope="col" class="border border-black w-2/12 py-2 px-3">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          {questionsForSect.map((question, i) => (
            <Question key={question.id} question={question} id={form.id} />
          ))}
        </tbody>
      </table>

      <br />
    </div>
  );
};

export default Section;
