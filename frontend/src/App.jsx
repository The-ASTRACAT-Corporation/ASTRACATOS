import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/AddProjectForm';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(() => {
    setLoading(true);
    setError(null);
    axios.get('http://localhost:3000/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="App">
      <AddProjectForm onProjectAdded={fetchProjects} />
      <ProjectList
        projects={projects}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
