import { useSelector } from "react-redux";

const OtherInfo = ({ id }) => {
  const allSubmissions = useSelector((state) => state.forms);
  const submission = allSubmissions.find((form) => form.id === id);
  const submissions = allSubmissions.filter(
    (s) => s.title === submission.title && s.location === submission.location
  );

  const jan = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 0 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );

    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  const feb = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 1 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  const mar = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 2 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  const apr = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 3 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );

    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  const may = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 4 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );

    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  const jun = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 5 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  const jul = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 6 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  const aug = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 7 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  const sep = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 8 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  const oct = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 9 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  const nov = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 10 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  const dec = (str) => {
    const submissionforMth = submissions.findLast(
      (s) =>
        new Date(s.dateOfForm).getMonth() === 11 &&
        new Date(s.dateOfForm).getFullYear() ===
          new Date(submission.dateOfForm).getFullYear()
    );
    if (submissionforMth) {
      if (str === "date") {
        return new Date(submissionforMth.dateOfForm)
          .toLocaleString("en-SG")
          .substr(0, 5);
      } else if (submissionforMth.signature) {
        return <img src={submissionforMth.signature} />;
      }
      return null;
    }
  };

  return (
    <>
      <tr>
        <td
          scope="col"
          colspan="6"
          class="border border-black text-black text-xs text-right py-2 px-3 "
        >
          Date:
        </td>

        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {jan("date")}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {feb("date")}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {mar("date")}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {apr("date")}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {may("date")}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {jun("date")}
        </td>
        <td scope="col" class="border border-black text-black  py-2 px-3 ">
          {jul("date")}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {aug("date")}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {sep("date")}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {oct("date")}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {nov("date")}
        </td>
        <td scope="col" class="border border-black text-xs  py-2 px-3 ">
          {dec("date")}
        </td>
      </tr>
      <tr>
        <td
          scope="col"
          colspan="6"
          class="border border-black text-black text-xs text-right py-2 px-3 "
        >
          Signature:
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {jan()}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {feb()}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {mar()}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {apr()}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {may()}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {jun()}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {jul()}
        </td>
        <td scope="col" class="border border-black text-xs  text-black ">
          {aug()}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {sep()}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {oct()}
        </td>
        <td
          scope="col"
          class="border border-black text-xs text-black px-2 py-2 "
        >
          {nov()}
        </td>
        <td scope="col" class="border border-black text-xs text black ">
          {dec()}
        </td>
      </tr>
    </>
  );
};

export default OtherInfo;
