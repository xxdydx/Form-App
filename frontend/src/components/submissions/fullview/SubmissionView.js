import SCPreview from "./SafetyChecklist/SCPreview";
import FAPreview from "./FirstAidBox/FAPreview";

const SubmissionView = ({ form }) => {
  if (form === undefined) {
    return null;
  }
  return form.type === "FA" ? (
    <FAPreview form={form} />
  ) : (
    <SCPreview form={form} />
  );
};

export default SubmissionView;
