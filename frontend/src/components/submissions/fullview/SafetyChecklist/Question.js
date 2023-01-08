import { useSelector } from "react-redux";

const Question = ({ question, id }) => {
  const submissions = useSelector((state) => state.forms);
  const submission = submissions.find((form) => form.id === id);
  const questions1 = submission.questions;
  const index = questions1.findIndex((qn) => qn.id === question.id);

  return (
    <tr class="bg-white border-b  dark:bg-gray-800 dark:border-gray-700">
      <td class="border border-black  text-black text-center text-sm py-2 px-3">
        {index + 1}
      </td>
      <th
        scope="row"
        class="border border-black 	  py-2 px-3 font-bold text-sm text-black dark:text-white"
      >
        {question.content}
      </th>

      <td class="text-sm text-center border border-black text-black py-2 px-3">
        {question.answer}
      </td>
      <td class="text-sm border border-black text-black py-2 px-3">
        {question.remarks}
      </td>
    </tr>
  );
};

export default Question;
