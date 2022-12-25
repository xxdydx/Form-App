import { Card } from "flowbite-react";

const SubmissionForm = ({ form }) => {
  if (form === undefined) {
    return null;
  }

  return (
    <Card className="mb-4" href={`/submissions/${form.id}`}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {form.title}
      </h5>
      <p>
        Date Submitted: {new Date(form.dateSubmitted).toLocaleString("en-SG")}
      </p>
    </Card>
  );
};
export default SubmissionForm;
