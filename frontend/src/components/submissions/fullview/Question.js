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
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td class="text-sm py-4 px-6">{index + 1}</td>
      <th
        scope="row"
        class="py-4 px-6 font-normal text-sm text-gray-900  dark:text-white"
      >
        {question.content}
      </th>

      <td class="text-sm py-4 px-6">{question.answer}</td>
      <td class="text-sm py-4 px-6">{question.remarks}</td>
    </tr>
  );
};

export default Question;
