import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import Section from "./components/sampleForms/fullview/Section";
import { createSubmission } from "./reducers/formReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeSampleForms } from "./reducers/sampleFormReducer";
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

function App() {
  const dispatch = useDispatch();
  const sampleForms = useSelector((state) => state.sampleForms);
  console.log(sampleForms);

  useEffect(() => {
    dispatch(initializeSampleForms());
  }, [dispatch]);

  const match = useMatch("/forms/:id");
  const form = match
    ? sampleForms.find((form) => form.id === match.params.id)
    : null;

  return (
    <div className="">
      <NavigationBar />
      <Routes>
        <Route path="/forms" element={<FormList />} />
        <Route path="/forms/:id" element={<FormView form={form} />} />
        <Route path="/create" element={<CreateForm />} />
      </Routes>
    </div>
  );
}

export default App;
