const sampleFormRouter = require("express").Router();
const sampleForm = require("../models/sampleForm");

sampleFormRouter.get("/", async (req, res) => {
  const forms = await sampleForm.find({});
  res.json(forms);
});

sampleFormRouter.get("/:id", async (request, response) => {
  const form = await sampleForm.findById(request.params.id);
  if (form) {
    response.json(form.toJSON());
  } else {
    response.status(404).end();
  }
});

sampleFormRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const newSampleForm = new sampleForm({
    title: body.title,
    questions: body.questions,
  });
  try {
    const savedForm = await newSampleForm.save();
    response.status(201).json(savedForm);
  } catch (exception) {
    next(exception);
  }
});

module.exports = sampleFormRouter;
