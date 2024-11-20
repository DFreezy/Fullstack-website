import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Temporary in-memory storage for users
const users = [];

// POST endpoint to handle adding a user
app.post("/users", (req, res) => {
  const { name, email, comment } = req.body;

  if (name && email && comment) {
    const newUser = { id: users.length + 1, name, email, comment };
    users.push(newUser);

    // Send email notification
    sendEmailNotification('User', newUser);

    res.status(201).json(newUser); // Send back the created user data
  } else {
    res.status(400).json({ error: 'Missing name, email, or comment' });
  }
});

// Function to send an email notification when a user is added
const sendEmailNotification = (type, data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const subject = `New ${type} Submitted`;
  const text = `${type} Details:\n\n` +
               `Name: ${data.name}\n` +
               `Email: ${data.email}\n` +
               `Comment: ${data.comment}\n`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'duwaynefrieslaar23@gmail.com',
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
