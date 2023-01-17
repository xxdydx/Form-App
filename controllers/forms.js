const formRouter = require("express").Router();
const multer = require("multer");
const Form = require("../models/form");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./frontend/public/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

formRouter.post("/", upload.single("logo"), async (request, response, next) => {
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
    type: body.type,
    dateSubmitted: JSON.parse(body.dateSubmitted),
    dateOfForm: JSON.parse(body.dateOfForm),
    logo: body.logo,
    signature: body.signature,
    name: body.name,
    company: body.company,
    jobTitle: body.jobTitle,
    questions: JSON.parse(body.questions),
    location: body.location,
  });
  try {
    const savedForm = await form.save();
    response.status(201).json(savedForm);
  } catch (exception) {
    next(exception);
  }
});

formRouter.put("/:id", async (request, response, next) => {
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

  const form = {
    title: body.title,
    type: body.type,
    dateSubmitted: body.dateSubmitted,
    dateOfForm: JSON.parse(body.dateOfForm),
    logo: body.logo,
    signature: body.signature,
    name: body.name,
    company: body.company,
    jobTitle: body.jobTitle,
    location: body.location,
    questions: body.questions,
  };
  try {
    const updatedForm = await Form.findByIdAndUpdate(request.params.id, form, {
      new: true,
    });
    response.json(updatedForm.toJSON());
  } catch (exception) {
    next(exception);
  }
});

formRouter.delete("/:id", async (request, response, next) => {
  try {
    await Form.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = formRouter;
