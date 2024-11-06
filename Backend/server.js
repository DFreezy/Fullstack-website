// server.js or index.js (Express server)

import express from 'express';
import cors from 'cors';

const app = express();

// Use middleware to parse JSON data in the request body
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

const users = []; // Temporary in-memory storage for users

// POST endpoint to handle adding a user
app.post("/users", (req, res) => {
  const { name, email, comment} = req.body;  // Extract name and email from the body
  if (name && email && comment) {
    const newUser = { id: users.length + 1, name, email, comment};
    users.push(newUser);  // Add new user to the users array
    res.status(201).json(newUser); // Send back the created user data
  } else {
    res.status(400).json({ error: "Missing name or email" });
  }
});

// You can add a GET endpoint to retrieve the users if needed
app.get("/users", (req, res) => {
  res.json(users);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// DELETE: Delete a user by ID
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex((user) => user.id === userId);

  if (index !== -1) {
      const deletedUser = users.splice(index, 1); // Remove user from array
      res.json(deletedUser[0]); // Return deleted user
  } else {
      res.status(404).json({ error: "User not found" });
  }
});
