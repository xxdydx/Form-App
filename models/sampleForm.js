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

const sampleFormSchema = new mongoose.Schema({
  title: String,
  logo: String,
  questions: [questionSchema],
});
sampleFormSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("sampleForm", sampleFormSchema);
