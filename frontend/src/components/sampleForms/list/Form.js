import { useSelector, useDispatch } from "react-redux";
import { Card, Dropdown } from "flowbite-react";

const Form = ({ form }) => {
  const dispatch = useDispatch();
  const sampleForms = useSelector((state) => state.sampleForms);
  if (form === undefined) {
    return null;
  }

  return (
    <Card className="mb-4" href={`/forms/${form.id}`}>
      <a>
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {form.title}
          </h5>
          {form.type === "FA" ? <p>Location: {form.location}</p> : null}
        </div>
      </a>
    </Card>
  );
};
export default Form;
