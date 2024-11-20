import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files (uploaded images)
app.use('/uploads', express.static('uploads'));

// Setup multer for handling image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store images in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
    }
});

const upload = multer({ storage });

// Temporary in-memory storage for users and projects
const users = [];
const projects = [
    { id: 1, name: 'Project Alpha', email: 'alpha@example.com', comment: 'First project', image: '' },
    { id: 2, name: 'Project Beta', email: 'beta@example.com', comment: 'Second project', image: '' }
];

// POST endpoint to handle adding a user
app.post("/users", (req, res) => {
  const { name, email, comment } = req.body;
  if (name && email && comment) {
    const newUser = { id: users.length + 1, name, email, comment };
    users.push(newUser);
    res.status(201).json(newUser); // Send back the created user data
  } else {
    res.status(400).json({ error: "Missing name, email, or comment" });
  }
});

// GET endpoint to retrieve all users
app.get("/users", (req, res) => {
  res.json(users);
});

// DELETE endpoint to delete a user by ID
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex((user) => user.id === userId);

  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]); // Return deleted user
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// GET endpoint to retrieve all projects
app.get('/projects', (req, res) => {
    res.json(projects);
});

// POST endpoint to add a new project (with image upload)
// POST endpoint to add a new project (with image upload)
app.post('/projects', upload.single('image'), (req, res) => {
  const { name, email, comment } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : ''; // Handle image if uploaded

  // Ensure all required fields are provided
  if (name && email && comment) {
      // Create a new project object
      const newProject = { 
          id: projects.length + 1,  // Generate a new ID for the project
          name,
          email, 
          comment, 
          image  // Include image path if available
      };

      // Add the new project to the projects array
      projects.push(newProject);

      // Respond with the newly created project data
      res.status(201).json(newProject); 
  } else {
      // If required fields are missing, respond with an error
      res.status(400).json({ error: 'Missing name, email, or comment' });
  }
});


// DELETE endpoint to delete a project by ID
app.delete('/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id, 10);
    const index = projects.findIndex(project => project.id === projectId);

    if (index !== -1) {
        const deletedProject = projects.splice(index, 1); // Remove project from array
        res.json(deletedProject[0]); // Respond with deleted project
    } else {
        res.status(404).json({ error: 'Project not found' });
    }
});

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
