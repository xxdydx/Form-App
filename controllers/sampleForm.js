const sampleFormRouter = require("express").Router();
const multer = require("multer");
const sampleForm = require("../models/sampleForm");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./frontend/public/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

sampleFormRouter.post(
  "/",
  upload.single("logo"),
  async (request, response, next) => {
    const body = request.body;
    const newSampleForm = new sampleForm({
      title: body.title,
      type: body.type,
      location: body.location,
      questions: JSON.parse(body.questions),
      logo: request.file.originalname,
    });
    try {
      const savedForm = await newSampleForm.save();
      response.status(201).json(savedForm);
    } catch (exception) {
      next(exception);
    }
  }
);

sampleFormRouter.put(
  "/:id",
  upload.single("logo"),
  async (request, response, next) => {
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
      type: body.type,
      location: body.location,
      questions: JSON.parse(body.questions),
      logo: body.logo,
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
  }
);

sampleFormRouter.delete("/:id", async (request, response, next) => {
  try {
    await sampleForm.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = sampleFormRouter;
