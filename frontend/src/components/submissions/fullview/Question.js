const Question = ({ question, index }) => {
  const answerForQ = (answer) => {
    if (answer === "No") {
      return (
        <>
          <s>Yes /</s> No <s>/ NA</s>
        </>
      );
    }
    if (answer === "N/A") {
      return (
        <>
          <s>Yes / No /</s> NA
        </>
      );
    }
    if (answer === "Yes") {
      return (
        <>
          Yes / <s> No / NA </s>
        </>
      );
    } else {
      return null;
    }
  };
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
