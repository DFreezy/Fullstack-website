import express from "express";
import cors from "cors"; // Import CORS
import users from "./users.js";

const app = express();

// Middleware to handle JSON responses and enable CORS
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

app.get("/", (req, res) => {
    res.send("Server is ready");
});

// Route to get users data
app.get("/users", (req, res) => {
    res.json(users); // Send JSON data
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
