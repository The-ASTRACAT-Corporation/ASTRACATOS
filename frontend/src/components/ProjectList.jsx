import React from 'react';

const ProjectList = ({ projects, loading, error }) => {
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
