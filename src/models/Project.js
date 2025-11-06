const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', '..', 'db.json');

function readData() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { projects: [], tasks: [], files: [] };
    }
    throw error;
  }
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

let { projects } = readData();
let currentId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;

class Project {
  constructor(name, description, userId, settings) {
    this.id = currentId++;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.status = 'active';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.settings = settings || {};
  }

  static findAll() {
    return projects;
  }

  static findById(id) {
    return projects.find(project => project.id === id);
  }

  static create(projectData) {
    const project = new Project(projectData.name, projectData.description, projectData.userId, projectData.settings);
    projects.push(project);
    writeData({ projects });
    return project;
  }

  static update(id, projectData) {
    const project = this.findById(id);
    if (project) {
      project.name = projectData.name || project.name;
      project.description = projectData.description || project.description;
      project.status = projectData.status || project.status;
      project.settings = projectData.settings || project.settings;
      project.updatedAt = new Date();
      writeData({ projects });
    }
    return project;
  }

  static delete(id) {
    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex !== -1) {
      projects.splice(projectIndex, 1);
      writeData({ projects });
      return true;
    }
    return false;
  }
}

module.exports = Project;
