# Autonomize AI assignment - GitHub Explorer

---

## BACKEND

This repository contains the backend codebase for our application. The backend is built using Node.js, Express.js, MongoDB, and TypeScript, providing the necessary functionality to support the frontend and other parts of the system.

## Installation

To get started with the backend, follow these steps:

1 - Clone this repository to your local machine:

    git clone https://github.com/AbuQamar7379/Autonomize-AI.git

2 - Navigate to the project directory:

    cd backend/

3 - Install dependencies using npm install:

    npm install

4 - Run the backend server using npm start:

    npm start

## Deployment

[Click to redirect to Backend App](https://autonomize-ai-br5h.onrender.com/)

## Usage

Once the backend server is running, you can interact with it using HTTP requests. Here are some examples of endpoints you can use:

### Route to save a user in DB

- GET /api/github/save-user/:username

### Route to find mutual followers

- GET /api/github/mutual-followers/:username

### Route to search users with query

- GET /api/github/search-users

### Route to soft delete a user

- DELETE /api/github/delete-user/:username

### Route to update a user

- PATCH /api/github/update-user/:username

### Route to list users with query

- GET /api/github/list-users

---
