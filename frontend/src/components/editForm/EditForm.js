import SafetyChecklist from "./SafetyChecklist";
import FirstAidBox from "./FirstAidBox";
const EditForm = ({ form }) => {
  if (form === undefined) {
    return null;
  }
  return (
    <>
      {form.type === "FA" ? (
        <FirstAidBox form={form} />
      ) : (
        <SafetyChecklist form={form} />
      )}
    </>
  );
};

export default EditForm;
