const router = require("express").Router();
let Project = require("../models/project.model");

router.route("/").get((req, res) => {
  Project.find()
  .then(projects => res.json(projects))
  .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const clientname = req.body.clientname;
  const email = req.body.email;
  const mobile = Number(req.body.mobile);
  const project = req.body.project;
  const date = Date.parse(req.body.date);

  const newProject = new Project({
    clientname,
    email,
    mobile,
    project,
    date
  });

  newProject.save()
    .then(() => res.json("Project added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) =>{
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) =>{
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json("Project deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Project.findById(req.params.id)
  .then(project => {
    project.clientname = req.body.clientname;
    project.email = req.body.email;
    project.mobile = Number(req.body.mobile);
    project.project = req.body.project;
    project.date = Date.parse(req.body.date);

    project.save()
    .then(() => res.json("Project updated."))
    .catch(err => res.status(400).json("Error: " + err));
    
    return project
  })
  .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;