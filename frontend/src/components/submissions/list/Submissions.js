import SubmissionForm from "./SubmissionForm";
import { useSelector, useDispatch } from "react-redux";

const Submissions = () => {
  const forms = useSelector((state) => state.forms);
  const forms1 = [...forms];

  const compareDate = (a, b) => {
    const dateA = a.dateSubmitted;
    const dateB = b.dateSubmitted;
    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <div className="">
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between px-4 mx-auto max-w-6xl ">
          <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                Form Submissions
              </h1>
              <address className="flex items-center mb-6 not-italic"></address>
            </header>
            {forms1.length > 0 ? (
              forms1
                .sort(compareDate)
                .map((form) => <SubmissionForm key={form.id} form={form} />)
            ) : (
              <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <footer className="flex justify-between items-center"></footer>
                <p className="text-gray-500 dark:text-gray-400">
                  No submissions yet... Submit a form!
                </p>
              </article>
            )}
          </article>
        </div>
      </main>
    </div>
  );
};

export default Submissions;
