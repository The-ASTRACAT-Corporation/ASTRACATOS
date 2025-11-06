const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Vibe Coding Platform!');
});

app.use('/projects', projectRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
