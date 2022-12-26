import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import Section from "./components/sampleForms/fullview/Section";
import { createSubmission } from "./reducers/formReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeSampleForms } from "./reducers/sampleFormReducer";
import { initializeForms } from "./reducers/formReducer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
} from "react-router-dom";
import FormView from "./components/sampleForms/fullview/FormView";
import FormList from "./components/sampleForms/list/FormList";
import NavigationBar from "./components/NavigationBar";
import CreateForm from "./components/createForm/CreateForm";
import Submissions from "./components/submissions/list/Submissions";
import SubmissionView from "./components/submissions/fullview/SubmissionView";
import Notif from "./components/Notif";
import EditForm from "./components/editForm/EditForm";

function App() {
  const dispatch = useDispatch();
  const sampleForms = useSelector((state) => state.sampleForms);
  const submissions = useSelector((state) => state.forms);

  useEffect(() => {
    dispatch(initializeSampleForms());
  }, [dispatch]);
  useEffect(() => {
    dispatch(initializeForms());
  }, [dispatch]);

  const match = useMatch("/forms/:id");
  const form = match
    ? sampleForms.find((form) => form.id === match.params.id)
    : null;
  const match1 = useMatch("/submissions/:id");
  const form1 = match1
    ? submissions.find((form) => form.id === match1.params.id)
    : null;

  const match2 = useMatch("/forms/edit/:id");
  const form2 = match2
    ? sampleForms.find((form) => form.id === match2.params.id)
    : null;

  return (
    <div className="">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/forms/:id" element={<FormView form={form} />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route
          path="/submissions/:id"
          element={<SubmissionView form={form1} />}
        />
        <Route path="/forms/edit/:id" element={<EditForm form={form2} />} />
      </Routes>
      <Notif />
    </div>
  );
}

export default App;
