import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get('http://localhost:3000/projects')
        .then(response => {
          setProjects(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching projects:", error);
          setError(error);
          setLoading(false);
        });
    }, 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error loading projects: {error.message}</p>;

  return (
    <div>
      <h1>Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project.id}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
