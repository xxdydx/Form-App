import SafetyChecklistView from "./SafetyChecklist/SafetyChecklistView";
import FirstAidBoxView from "./FirstAidBox/FirstAidBoxView";
const FormView = ({ form }) => {
  if (form === undefined) {
    return null;
  }
  return form.type === "FA" ? (
    <FirstAidBoxView form={form} />
  ) : (
    <SafetyChecklistView form={form} />
  );
};

export default FormView;
