import { useSelector } from "react-redux";

const Question = ({ question, id }) => {
  const allSubmissions = useSelector((state) => state.forms);
  const submission = allSubmissions.find((form) => form.id === id);
  const questions1 = submission.questions;
  const index = questions1.findIndex((qn) => qn.id === question.id);

  const submissions = allSubmissions.filter(
    (s) => s.title === submission.title && s.location === submission.location
  );

  const janAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 0 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };
  const febAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 1 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };
  const marAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 2 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };
  const aprAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 3 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };
  const mayAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 4 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };
  const junAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 5 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };
  const julAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 6 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };
  const augAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 7 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };
  const sepAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 8 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };
  const octAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 9 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };
  const novAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 10 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };
  const decAns = () => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 11 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      const qninqn = submissionforMth.questions.find(
        (qn) => qn.content === question.content
      );
      if (qninqn.answer === "Yes") {
        return "✓";
      }
      if (qninqn.answer === "No" || !qninqn.answer) {
        return " ";
      }
    }
    return " ";
  };

  return (
    <tr>
      <td scope="col" class="border border-black text-black  py-2 px-3 ">
        {index + 1}
      </td>
      <td
        scope="col"
        colspan="4"
        class="border border-black text-black py-2 px-3 "
      >
        {question.content}
      </td>
      <td scope="col" class="border border-black text-black  py-2 px-3 ">
        {question.quantity}
      </td>
      <td scope="col" class="border border-black text-black py-2 px-3 ">
        {janAns()}
      </td>
      <td scope="col" class="border border-black text-black py-2 px-3 ">
        {febAns()}
      </td>
      <td scope="col" class="border border-black text-black py-2 px-3 ">
        {marAns()}
      </td>
      <td scope="col" class="border border-black text-black py-2 px-3 ">
        {aprAns()}
      </td>
      <td scope="col" class="border border-black text-black py-2 px-3 ">
        {mayAns()}
      </td>
      <td scope="col" class="border border-black text-black py-2 px-3 ">
        {junAns()}
      </td>
      <td scope="col" class="border border-black text-black py-2 px-3 ">
        {julAns()}
      </td>
      <td scope="col" class="border border-black text-black  py-2 px-3 ">
        {augAns()}
      </td>
      <td scope="col" class="border border-black text-black py-2 px-3 ">
        {sepAns()}
      </td>
      <td scope="col" class="border border-black text-black py-2 px-3 ">
        {octAns()}
      </td>
      <td scope="col" class="border border-black text-black py-2 px-3 ">
        {novAns()}
      </td>
      <td scope="col" class="border border-black text-black  py-2 px-3 ">
        {decAns()}
      </td>
    </tr>
  );
};

export default Question;
