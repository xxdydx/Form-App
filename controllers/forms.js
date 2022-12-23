const formRouter = require("express").Router();
const Form = require("../models/form");

formRouter.get("/", async (req, res) => {
  const forms = await Form.find({});
  res.json(forms);
});

formRouter.get("/:id", async (request, response) => {
  const form = await Form.findById(request.params.id);
  if (form) {
    response.json(form.toJSON());
  } else {
    response.status(404).end();
  }
});

formRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (!body.dateSubmitted) {
    return response.status(400).json({
      error: "frontend error with date processing",
    });
  }
  if (!body.questions) {
    body.questions = [];
  }
  if (!body.title) {
    return response.status(400).json({
      error: "title is required",
    });
  }

  const form = new Form({
    title: body.title,
    dateSubmitted: body.dateSubmitted,
    questions: body.questions,
  });
  try {
    const savedForm = await form.save();
    response.status(201).json(savedForm);
  } catch (exception) {
    next(exception);
  }
});

module.exports = formRouter;
