import React, { useState } from 'react';
import axios from 'axios';

const AddProjectForm = ({ onProjectAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    axios.post('http://localhost:3000/projects', { name, description, userId: 1 }) // userId is hardcoded for now
      .then(response => {
        onProjectAdded(response.data);
        setName('');
        setDescription('');
      })
      .catch(error => {
        console.error("Error adding project:", error);
        setError(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProjectForm;
