import Form from "./Form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeSampleForms } from "../../../reducers/sampleFormReducer";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "flowbite-react";

const FormList = () => {
  const [query, setQuery] = useState("");
  const sampleForms = useSelector((state) => state.sampleForms);
  const dispatch = useDispatch();
  const sampleForms1 = [...sampleForms];

  const filtering = (event) => {
    setQuery(event.target.value);
  };
  const search = (value) => {
    const filterexp = new RegExp(query, "i");
    return filterexp.test(value.title);
  };

  return (
    <div className="">
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between px-4 mx-auto max-w-6xl ">
          <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format relative">
              <h1 class="pb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                Forms
              </h1>

              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="absolute top-0 right-0 pb-4">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="mb-4 w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Forms..."
                  onChange={filtering}
                  required
                />
              </div>
            </header>
            {sampleForms1.length > 0 ? (
              sampleForms1
                .filter(search)
                .map((form) => <Form key={form.id} form={form} />)
            ) : (
              <article className="py-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <footer className="flex justify-between items-center"></footer>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No forms yet... Create a form!
                </p>
                <a href="/create">
                  <Button className="mt-4" variant="contained">
                    <AddIcon className="mr-2 h-2.5 w-2.5" />
                    Create a Form
                  </Button>
                </a>
              </article>
            )}
          </article>
        </div>
      </main>
    </div>
  );
};

export default FormList;
