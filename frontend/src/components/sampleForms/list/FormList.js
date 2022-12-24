import Form from "./Form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeSampleForms } from "../../../reducers/sampleFormReducer";

const FormList = () => {
  const sampleForms = useSelector((state) => state.sampleForms);
  const dispatch = useDispatch();
  const sampleForms1 = [...sampleForms];

  return (
    <div className="">
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between px-4 mx-auto max-w-6xl ">
          <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                Forms
              </h1>
              <address className="flex items-center mb-6 not-italic"></address>
            </header>
            {sampleForms1.length > 0 ? (
              sampleForms1.map((form) => <Form key={form.id} form={form} />)
            ) : (
              <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <footer className="flex justify-between items-center"></footer>
                <p className="text-gray-500 dark:text-gray-400">
                  No forms yet... Create one!
                </p>
              </article>
            )}
          </article>
        </div>
      </main>
    </div>
  );
};

export default FormList;
