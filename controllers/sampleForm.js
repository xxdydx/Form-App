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

sampleFormRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  if (!body.questions) {
    return response.status(400).json({
      error: "questions are required",
    });
  }
  if (!body.title) {
    return response.status(400).json({
      error: "title is required",
    });
  }

  const form = {
    title: body.title,
    questions: body.questions,
  };
  try {
    const updatedForm = await sampleForm.findByIdAndUpdate(
      request.params.id,
      form,
      {
        new: true,
      }
    );
    response.json(updatedForm.toJSON());
  } catch (exception) {
    next(exception);
  }
});

sampleFormRouter.delete("/:id", async (request, response, next) => {
  try {
    await sampleForm.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = sampleFormRouter;
