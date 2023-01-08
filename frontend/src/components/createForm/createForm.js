import { useState } from "react";
import { Dropdown } from "flowbite-react";
import SafetyChecklist from "./SafetyChecklist";
import FirstAidBox from "./FirstAidBox";

const CreateForm = () => {
  const [form, setForm] = useState(true);
  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
      <div id="form" className="flex justify-between px-4 mx-auto max-w-6xl ">
        <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <Dropdown label="Type of form" dismissOnClick={true} inline={true}>
            <Dropdown.Item onClick={() => setForm(true)}>
              Safety Checklist
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setForm(false)}>
              First Aid Box Checklist
            </Dropdown.Item>
          </Dropdown>
          {form ? <SafetyChecklist /> : <FirstAidBox />}
        </article>
      </div>
    </main>
  );
};

export default CreateForm;
