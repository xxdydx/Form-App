import { useSelector, useDispatch } from "react-redux";
import { Card } from "flowbite-react";

const Form = ({ form }) => {
  const dispatch = useDispatch();
  const sampleForms = useSelector((state) => state.sampleForms);
  if (form === undefined) {
    return null;
  }

  return (
    <Card className="mb-4" href={`/forms/${form.id}`}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {form.title}
      </h5>
    </Card>
  );
};
export default Form;
