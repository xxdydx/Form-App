const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  content: String,
  section: String,
  answer: String,
  remarks: String,
});
questionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const formSchema = new mongoose.Schema({
  title: String,
  type: String,
  dateSubmitted: Date,
  logo: String,
  signature: String,
  name: String,
  company: String,
  jobTitle: String,
  location: String,
  questions: [questionSchema],
});
formSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Form", formSchema);
