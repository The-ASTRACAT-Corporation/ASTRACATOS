const Project = require('../models/Project');

exports.getAllProjects = (req, res) => {
  res.json(Project.findAll());
};

exports.getProjectById = (req, res) => {
  const project = Project.findById(parseInt(req.params.id));
  if (project) {
    res.json(project);
  } else {
    res.status(404).send('Project not found');
  }
};

exports.createProject = (req, res) => {
  const project = Project.create(req.body);
  res.status(201).json(project);
};

exports.updateProject = (req, res) => {
  const project = Project.update(parseInt(req.params.id), req.body);
  if (project) {
    res.json(project);
  } else {
    res.status(404).send('Project not found');
  }
};

exports.deleteProject = (req, res) => {
  const success = Project.delete(parseInt(req.params.id));
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send('Project not found');
  }
};
